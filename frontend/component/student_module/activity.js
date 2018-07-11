import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {attendance_database_three_A} from '../App'
import {activities_entry_database} from '../App'



PouchDB.plugin(require('pouchdb-find'));

var subData=[];
var sub='';
var data=[];
var data_sorted_by_class=[];
var data_sorted_by_marks=[];
var class_value='';
var section_value='';
var y=[];
var p=[];
var weight:0
var exam:''

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

attendance_database_three_A.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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
  if (a.name < b.name ) return 1;
  return 0;
};

class Activity extends Component {
  constructor(props) {
    super(props);

      this.state = {
        selected: [],
        sorted: 'asc',
        _id:'',
        Grades:[]
          };
          this.baseState = this.state ;
      }

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    if(data_sorted_by_marks.length===0){
      console.log('i ma here');
      return data_sorted_by_class.sort(compare);
    }
    else{
      return data_sorted_by_marks.sort(compare);
    }
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


  Exams=[
    {value:'Punctuality/ut1' ,label:'Punctuality/Unit Test 1'},
    {value:'Punctuality/ut2' ,label:'Punctuality/Unit Test 2'},
    {value:'Punctuality/ut3' ,label:'Punctuality/Unit Test 3'},
    {value:'Good Habits/ut1' ,label:'Good Habits/Unit Test 1'},
    {value:'Good Habits/ut2' ,label:'Good Habits/Unit Test 2'},
    {value:'Good Habits/ut3' ,label:'Good Habits/Unit Test 3'},
    {value:'Moral Values/ut1' ,label:'Moral Values/Unit Test 1'},
    {value:'Moral Values/ut2' ,label:'Moral Values/Unit Test 2'},
    {value:'Moral Values/ut3' ,label:'Moral Values/Unit Test 3'},
    {value:'Manners/ut1' ,label:'Manners/Unit Test 1'},
    {value:'Manners/ut2' ,label:'Manners/Unit Test 2'},
    {value:'Manners/ut3' ,label:'Manners/Unit Test 3'},
    {value:'Drawing/ut1' ,label:'Drawing/Unit Test 1'},
    {value:'Drawing/ut2' ,label:'Drawing/Unit Test 2'},
    {value:'Drawing/ut3' ,label:'Drawing/Unit Test 3'},
    {value:'Art and Craft/ut1' ,label:'Art and Craft/Unit Test 1'},
    {value:'Art and Craft/ut2' ,label:'Art and Craft/Unit Test 2'},
    {value:'Art and Craft/ut3' ,label:'Art and Craft/Unit Test 3'},
    {value:'Music/ut1' ,label:'Music/Unit Test 1'},
    {value:'Music/ut2' ,label:'Music/Unit Test 2'},
    {value:'Music/ut3' ,label:'Music/Unit Test 3'},
  ];

  x=(item)=>{
    y.push(item);
  }


  handleExamName = ( value) => {
    exam=value;
    console.log(value);
    this.setState({Exam: value});
    activities_entry_database.find({
     selector: {class :class_value ,
               section:section_value,
               activity:value
     }
    }).then(function (result) {
      if(result.docs.length!==0){
        data_sorted_by_marks=[]
        result.docs.forEach(function(Object){
          data_sorted_by_marks.push(Object)
        });
        console.log(data_sorted_by_marks);
      }
      else{
        data_sorted_by_marks=[]
      }

   }).catch(function (err) {
     console.log(err);
   });


  };

  handleGrades = (name,value) => {
    p[name]=value;
    this.setState({Grades: value})
 };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  handleclass = (value) => {
    data_sorted_by_class=[];
    this.setState({classvalue: value});
    class_value=value;
    if(class_value!=='' && section_value!=='' ){
      console.log(class_value);
       attendance_database_three_A.find({
        selector: {class :class_value ,
                  section:section_value
        }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_class.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }

  };

  handlesection = (value) => {
    data_sorted_by_class=[];
    this.setState({sectionvalue: value});
    section_value=value;
    if(class_value!=='' && section_value!=='' ){
       attendance_database_three_A.find({
        selector: {
          class:class_value,
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

  handleMarksEntry=()=>{
    console.log(data)
    if(data_sorted_by_marks.length===0){
        data_sorted_by_class.forEach(function(Object){
          activities_entry_database.post({
            enroll:Object._id,
            name:Object.name,
            class:Object.class,
            section:Object.section,
            activity:exam,
            marks:p[Object._id]
          })
          data_sorted_by_class=[]
        });
      }
      else{
        data_sorted_by_marks.forEach(function(Object){
          activities_entry_database.get(Object._id).then(function(doc) {
            return activities_entry_database.put({
              _id: Object._id,
              _rev: doc._rev,
              enroll:Object.enroll,
              name:Object.name,
              class:Object.class,
              section:Object.section,
              activity:exam,
              marks:p[Object._id]
            });
            }).then(function(response) {
              data_sorted_by_marks=[]
            }).catch(function (err) {
              console.log(err);
            });
        });
      }
      this.setState({classvalue: ''});
      this.setState({section_value: ''});
      this.setState({Exam: ''});
    }

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
      <h1>Activities Grade Entry</h1>
        <Card>
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


        <Dropdown icon='label'
          source={this.Exams} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handleExamName}
          value={this.state.Exam} label='Exam Name' required
        />

      <Table onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>Class</TableCell>
          <TableCell string>Section</TableCell>
          <TableCell string>Activity</TableCell>
          <TableCell string>Grades</TableCell>
          <TableCell string>Enter Marks</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.class}</TableCell>
            <TableCell >{item.section}</TableCell>
            <TableCell >{item.activity}</TableCell>
            <TableCell >{item.marks}</TableCell>
            <TableCell ><Input type='no' label='marks' name='marks' icon='person' value={this.x(item)} onChange={this.handleGrades.bind(this, item._id)} /></TableCell>
            </TableRow>
        ))}

      </Table>
      <Button  icon='done' label='Update Marks ' onClick={this.handleMarksEntry} accent raised/>
      </Card>
      </div>
    );
  }
}

export default Activity;
