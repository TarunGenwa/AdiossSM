import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {attendance_database_three_B} from '../App'
import {attendance_database_three_A} from '../App'
PouchDB.plugin(require('pouchdb-find'));

var changes = attendance_database_three_A.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]
    attendance_database_three_A.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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

var ids=[]
var class_value='';
var section_value='';
var data=[];
var data_sorted_by_class=[];
var attendence_date='';
attendance_database_three_A.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
   // console.log(entry.doc);
    data.push(entry.doc);
  });

});
const u=[];

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

class attendance extends Component {
  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:'',
    date1:''
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    if(class_value==='' && section_value===''){
      return data.sort(compare);
    }
    else{
      return data_sorted_by_class.sort(compare);
    }
  };
  handleChange = (name, value) => {
    attendence_date=value.toString();
    this.setState({...this.state, [name]: value});
    attendance_database_three_B.find({
    selector: {date: attendence_date.slice(0,15),
      class:class_value,
      section:section_value
    }
  }).then(function (result) {

    console.log('yahan hun me');
    for (var i=0; i <data_sorted_by_class.length; i++) {
        data_sorted_by_class[i].status='Absent'
    }
      ids=[]
    result.docs.forEach(function(Object){
      ids.push(Object._id)
      for (var i=0;i<data_sorted_by_class.length;i++){
        if(data_sorted_by_class[i]._id===Object.enroll){
          data_sorted_by_class[i].status='Present'
        }
      }
   });
    console.log('ids');
    console.log(ids);

  }).catch(function (err) {
    console.log(err);
  });


    console.log(value);
  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item]._id) });
  };
  Class = [
    { value: 1, label: '1st' },
    { value: 2, label: '2nd'},
    { value: 3, label: '3rd' },
    { value: 4, label: '4th' },
    { value: 5, label: '5th'},
    { value: 6, label: '6th' },
    { value: 7, label: '7th' },
    { value: 8, label: '8th'},
    { value: 9, label: '9th' },
    { value: 10, label: '10th' },
    { value: 11, label: '11th'},
    { value: 12, label: '12th' }
  ];
  section = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B'},
    { value: 'C', label: 'C' }
  ];
  handleClick=()=>{
    const name = this.state.name;
    u.push(x.map(function(item,index){
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
    //this.handleChange(this.state.date1,attendence_date)

  };
  handleclass = (value) => {
    data_sorted_by_class=[];
    this.setState({classvalue: value});
    class_value=value;
    console.log(class_value);
    if(class_value!=='' && section_value!=='' ){
      console.log(class_value);
       attendance_database_three_A.find({
        selector: {class :class_value
                , section:section_value
        }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_class.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
    this.handleChange(this.state.date1,attendence_date)

  };

  handlesection = (value) => {
    data_sorted_by_class=[];
    this.setState({sectionvalue: value});
    console.log(value);
    section_value=value;
      this.handleChange(this.state.date1,attendence_date)
    if(class_value!=='' && section_value!=='' ){

       attendance_database_three_A.find({
        selector: {class:class_value,
          section :section_value }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_class.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }


  };

  handleMarkPresent=()=>{
    if(attendence_date===''){
      alert('enter date');
    }else{

      console.log(ids);
      ids.forEach(function(entry){
        attendance_database_three_B.get(entry).then(function(doc) {
        return attendance_database_three_B.remove(doc);
        }).then(function (result) {
          // handle result
        }).catch(function (err) {
          console.log(err);
        });
      })

      console.log(this.state.selected);
      this.state.selected.forEach(function(entry){
        console.log(entry);
        attendance_database_three_B.post({enroll:entry,date:attendence_date.slice(0,15) ,class:class_value,section:section_value});
      })
    }
    this.setState({date1:''})
    this.handleclass(class_value)


  }

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();


    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>


        <Dropdown icon='date_range'
          source={this.Class} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handleclass}
          value={this.state.classvalue} label='Standard' required
        />
        <Dropdown icon='label'
          source={this.section} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handlesection}
          value={this.state.sectionvalue} label='Section' required
        />


      <DatePicker icon='event'
          label='Date'
          onChange={this.handleChange.bind(this, 'date1')}
          value={this.state.date1}
          sundayFirstDayOfWeek
          required />

      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>ID</TableCell>
          <TableCell string>Name</TableCell>
          <TableCell string>Class</TableCell>
          <TableCell string>Section</TableCell>
          <TableCell string>Status</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell >{item._id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.class}</TableCell>
            <TableCell >{item.section}</TableCell>
            <TableCell >{item.status}</TableCell>
            </TableRow>
        ))}

      </Table>
       <Card><Button  label='Mark Present' onClick={this.handleMarkPresent} accent raised/></Card>

      </div>
    );
  }
}

export default attendance;
