import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {employee_details_database} from '../App'
PouchDB.plugin(require('pouchdb-find'));

var name_value='';;
var data=[];
var data_sorted_by_name=[];
var salary='';


var changes = employee_details_database.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]
    employee_details_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        console.log(entry.doc);
        data.push(entry.doc);
      });});
}).on('complete', function(info) {
  // changes() was canceled
  console.log('changes have been made')
}).on('error', function (err) {
  console.log(err);
});


employee_details_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
   // console.log(entry.doc);
    data.push(entry.doc);
  });

});

const sortByIdAsc = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const sortByIdDesc = (a, b) => {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
};

class EmployeeAttendance extends Component {

  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:'',
    newSalary:''
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

  handleNewSalary=(name,value)=>{
    salary=value
    this.setState({...this.state,[name]:value})
    console.log(this.state.newSalary)
  }

  handleUpdateSalary=()=>{
    console.log(this.state.selected);

    employee_details_database.find({
     selector: {name :this.state.selected[0]}
   }).then(function(response) {
     console.log(response.docs[0])
     return employee_details_database.put({
      _id: response.docs[0]._id,
      _rev: response.docs[0]._rev,
       name: response.docs[0].name,
       phone: response.docs[0].phone,
       email: response.docs[0].email,
       gendervalue:response.docs[0].gendervalue,
      nationality:response.docs[0].nationality,
      address_line1: response.docs[0].address_line1,
      address_line2: response.docs[0].address_line2,
      address_City: response.docs[0].address_City,
      address_Pincode: response.docs[0].address_Pincode,
      address_State: response.docs[0].address_State,
      father_name:response.docs[0].father_name,
      catvalue:response.docs[0].catvalue,
      date1:response.docs[0].date1,
      salary:salary,
      paymentType:response.docs[0].paymentType
      });
    }).catch(function (err) {
      console.log(err);
    });

};

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();


    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>



      <Input icon='person' type='text' value={this.state.name} label='Search Name' required onChange={this.handleName.bind(this, 'name')}  />

      <Table onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>Salary</TableCell>
          <TableCell string>DOB</TableCell>
          <TableCell string>Phone</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.salary}</TableCell>
            <TableCell >{item.date1}</TableCell>
            <TableCell >{item.phone}</TableCell>
            </TableRow>
        ))}

      </Table>
      <Input icon='person' type='text' value={this.state.newSalary} label='New Salary' required onChange={this.handleNewSalary.bind(this, 'newSalary')}  />
       <Card><Button label='Update Salary of Selected' onClick={this.handleUpdateSalary} accent raised/></Card>

      </div>
    );
  }
}

export default EmployeeAttendance;
