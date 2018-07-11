import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {employee_attendance_database} from '../App'
import {employee_details_database} from '../App'
PouchDB.plugin(require('pouchdb-find'));

var name_value='';;
var data=[];
var data_sorted_by_name=[];
var attendence_date='';
var temp=[]
var ids=[]
employee_details_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
   // console.log(entry.doc);
    data.push(entry.doc);
  });

});

const sortByIdAsc = (a, b) => {
  if (a._id < b._id) return -1;
  if (a._id > b._id) return 1;
  return 0;
};

const sortByIdDesc = (a, b) => {
  if (a._id > b._id) return -1;
  if (a._id < b._id) return 1;
  return 0;
};

class EmployeeAttendance extends Component {

  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:''
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    if(name_value==='' ){
      return data.sort(compare);
    }
    else{
      return data_sorted_by_name.sort(compare);
    }
  };
  handleChange = (name, value) => {
    attendence_date=value.toString();
    this.setState({...this.state, [name]: value});
    console.log(value);

    employee_attendance_database.find({
    selector: {date: attendence_date.slice(0,15)
      }
      }).then(function (result) {
        ids=[]
        if(result.docs.length!==0){
          ids=result.docs[0].present_employee
          console.log(ids);
          console.log('yahan');

          if(data_sorted_by_name.length!==0 || name_value!==''){
            console.log('yahan1');
            for(var j=0;j<data_sorted_by_name.length;j++){
                data_sorted_by_name[j].status='Absent'
            }
            for (var i=0;i<data_sorted_by_name.length;i++){
                for(var j=0;j<ids.length;j++){
                  if(ids[j]===data_sorted_by_name[i].name){
                    data_sorted_by_name[i].status='Present'
                  }
                }
            }
          }
          else{
            console.log(data);
            for(var j=0;j<data.length;j++){
                data[j].status='Absent'
            }
            for (var i=0;i<data.length;i++){
                for(var j=0;j<ids.length;j++){
                  if(ids[j]===data[i].name){
                    data[i].status='Present'
                  }
                }
            }

          }

        }

      }).catch(function (err) {
            console.log(err);
      });

  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };

  handleClick=()=>{
    const name = this.state.name;
    u.push(data.map(function(item,index){
      if(item.name===name)return item;
      else return -1;
    }));

    for(var a=u[0].length;a>-1;a--)
    {
      if(u[0][a]===-1)
      u[0].splice(a,1);
    }

    console.log(u[0]);
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  handleName = (name,value) => {
    data_sorted_by_name=[];
    this.setState({name: value});
    name_value=value.toUpperCase();
    console.log(name_value);
    if(name_value!==''  ){
       employee_details_database.find({
        selector: {name :name_value }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_name.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }

  };

  handleMarkPresent=()=>{
    console.log(this.state.selected);
    if(attendence_date===''){
      alert('enter date');
    }else{
    console.log(attendence_date)
    console.log(this.state.selected)
      employee_attendance_database.find({
       selector: {date:attendence_date.slice(0,15) }
     }).then((result)=> {
       if(result.docs.length!==0){
         result.docs.forEach((Object)=>{
           return employee_attendance_database.put({
             _id:Object._id,
             _rev:Object._rev,
             date:attendence_date.slice(0,15),
             present_employee:this.state.selected
           })
         });
       }
       else{
         employee_attendance_database.post({date:attendence_date.slice(0,15),present_employee:temp})
       }

     }).catch(function (err) {
       console.log(err);
     });

     this.handleChange(this.state.date1,attendence_date)


    }
  }

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();


    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>



      <DatePicker icon='event'
          label='Date'
          onChange={this.handleChange.bind(this, 'date1')}
          value={this.state.date1}
          sundayFirstDayOfWeek
          required />
      <Input icon='person' type='text' value={this.state.name} label='Search Name' required onChange={this.handleName.bind(this, 'name')}  />

      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>DOB</TableCell>
          <TableCell string>Phone</TableCell>
          <TableCell string>Status</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.date1}</TableCell>
            <TableCell >{item.phone}</TableCell>
            <TableCell >{item.status}</TableCell>
            </TableRow>
        ))}

      </Table>
       <Card><Button label='Mark Present' onClick={this.handleMarkPresent} accent raised/></Card>

      </div>
    );
  }
}

export default EmployeeAttendance;
