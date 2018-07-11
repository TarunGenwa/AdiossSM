import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {attendance_database_three_A} from '../App'
import {marks_entry_database_one_B} from '../App'
import {classWiseSubjectFacultyDB} from '../App'

PouchDB.plugin(require('pouchdb-find'));


var subData=[];
var sub='';
var data=[];
var data_sorted_by_class=[];
var data_sorted_by_marks=[]
var class_value='';
var section_value='';
var y=[];
var p=[];
var weight=0
var exam=''
var mar=''



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

class MarksEntry extends Component {
  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:'',
    subject:'',
    marks:[]

  };

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
    {value:'Unit Test 1' ,label:'Unit Test 1'},
    {value:'Unit Test 2' ,label:'Unit Test 2'},
    {value:'Unit Test 3' ,label:'Unit Test 3'},
    {value:'Half Yearly/Oral' ,label:'Half Yearly/Oral'},
    {value:'Half Yearly/Written' ,label:'Half Yearly/Written'},
    {value:'Annual Yearly/Oral' ,label:'Annual Yearly/Oral'},
    {value:'Annual Yearly/Written' ,label:'Annual Yearly/Written'},
  ];

  x=(item)=>{
    y.push(item);
  }

  handleSubject = (value) => {
    sub=value;
      this.setState({subject: value});

      marks_entry_database_one_B.find({
       selector: {class :class_value ,
                 section:section_value,
                 examName:exam,
                 subject:sub
       }
      }).then(function (result) {
          data_sorted_by_marks=[]
        if(result.docs.length!==0){
          result.docs.forEach(function(Object){
            data_sorted_by_marks.push(Object)
          });
        }
        else{
          data_sorted_by_marks=[]
          this.handleclass()
        }

     }).catch(function (err) {
       console.log(err);
     });
  };

  handleExamName = ( value) => {
    exam=value;
    console.log(value);
    this.setState({Exam: value});
    marks_entry_database_one_B.find({
     selector: {class :class_value ,
               section:section_value,
               examName:value,
               subject:sub
     }
    }).then(function (result) {
      if(result.docs.length!==0){
        console.log(result);
        data_sorted_by_marks=[]
        result.docs.forEach(function(Object){
          data_sorted_by_marks.push(Object)
        });
      }
      else{
        data_sorted_by_marks=[]
      }

   }).catch(function (err) {
     console.log(err);
   });


  };

  handleWeight = (name, value) => {
    weight=parseInt(value);
    this.setState({...this.state, [name]: value});
  };


  handleMaxMarks=(name,value)=>{
    mar=parseInt(value);
    this.setState({...this.state, [name]: value});
  }

  handleMarks = (name,value) => {
    console.log(name);
    p[name]=value;
    this.setState({...this.state, [name]: value});
    console.log(p)
  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    console.log(sortedData);
    if(data_sorted_by_class.length!==0 || data_sorted_by_marks.length!==0){
    this.setState({ selected: selected.map(item => sortedData[item].name) });
    }
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  handleclass = (value) => {
    console.log(value);
    data_sorted_by_class=[];
    this.setState({classvalue: value});
    class_value=value;
    //for subjects entry
    if(class_value!==''){
      classWiseSubjectFacultyDB.find({
       selector: {class :class_value }
     }).then(function (result) {
        subData=[]
       result.docs.forEach(function(Object){
         subData.push({value:Object.subject,label:Object.subject});
       });
     }).catch(function (err) {
       console.log(err);
     });
   }
    //console.log(class_value);

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


  };

  handlesection = (value) => {
    this.setState({sectionvalue: value});
    section_value=value;
    data_sorted_by_class=[]
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
      if(data_sorted_by_marks.length===0){

        data_sorted_by_class.forEach(function(Object){
          marks_entry_database_one_B.post({
            enroll:Object._id,
            name:Object.name,
            class:Object.class,
            section:Object.section,
            subject:sub,
            weightage:weight,
            MaxMarks:mar,
            examName:exam,
            marks:p[Object._id]
          })
          data_sorted_by_class=[]
        });
      }
      else{
        data_sorted_by_marks.forEach(function(Object){
          marks_entry_database_one_B.get(Object._id).then(function(doc) {
            return marks_entry_database_one_B.put({
              _id: Object._id,
              _rev: doc._rev,
              enroll:Object.enroll,
              name:Object.name,
              class:Object.class,
              section:Object.section,
              MaxMarks:mar,
              subject:sub,
              weightage:weight,
              examName:exam,
              marks:p[Object._id]
            });
            }).then(function(response) {
              data_sorted_by_marks=[]
            }).catch(function (err) {
              console.log(err);
            });
        });
      }
      this.handleclass('')
      this.handlesection('')

  };


  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

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
          source={subData} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handleSubject}
          value={this.state.subject} label='Subject' required
        />

        <Dropdown icon='label'
          source={this.Exams} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handleExamName}
          value={this.state.Exam} label='Exam Name' required
        />


          <Input type='no' label='Exam Weightage' name='weightage' icon='person' value={this.state.weightage} onChange={this.handleWeight.bind(this, 'weightage')} />

          <Input type='no' label='Max Marks' name='MaxMarks' icon='person' value={this.state.MaxMarks} onChange={this.handleMaxMarks.bind(this, 'MaxMarks')} />

      <Table onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>Class</TableCell>
          <TableCell string>Section</TableCell>
          <TableCell string>Subject</TableCell>
          <TableCell string>Exam Name</TableCell>
          <TableCell string>Marks</TableCell>
          <TableCell string>Enter Marks</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.class}</TableCell>
            <TableCell >{item.section}</TableCell>
            <TableCell >{item.subject}</TableCell>
            <TableCell >{item.examName}</TableCell>
            <TableCell >{item.marks}</TableCell>
            <TableCell ><Input type='no' label='marks' name='marks' icon='person' value={this.x(item)} onChange={this.handleMarks.bind(this, item._id)} />
            </TableCell>
            </TableRow>
        ))}

      </Table>
      <Button  icon='done' label='Update Marks ' onClick={this.handleMarksEntry} accent raised/>
      </Card>
      </div>
    );
  }
}

export default MarksEntry;
