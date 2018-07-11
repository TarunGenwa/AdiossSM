import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {classWiseSubjectFacultyDB} from '../App'
PouchDB.plugin(require('pouchdb-find'));

var class_value='';
var section_value='';
var data=[];
var data_sorted_by_class=[];

var changes = classWiseSubjectFacultyDB.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]
    classWiseSubjectFacultyDB.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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

classWiseSubjectFacultyDB.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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

class FacultyDetails extends Component {
  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:''
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    if(class_value==='' || section_value===''){
      return data.sort(compare);
    }
    else{
      return data_sorted_by_class.sort(compare);
    }
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
    { value: 12, label: '12th' },
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
  handleclass = (value) => {
    data_sorted_by_class=[];
    this.setState({classvalue: value});
    class_value=value;
    if(class_value!=='' && section_value!=='' ){
       attendance_database_three_A.find({
        selector: {class :class_value,
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
    console.log(value);
    section_value=value;
    if(class_value!=='' && section_value!=='' ){

       classWiseSubjectFacultyDB.find({
        selector: {section :section_value,
                class:class_value
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

      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>Class</TableCell>
          <TableCell string>Section</TableCell>
          <TableCell string>Subject</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell >{item._id}</TableCell>
            <TableCell>{item.faculty}</TableCell>
            <TableCell >{item.class}</TableCell>
            <TableCell >{item.section}</TableCell>
            <TableCell >{item.subject}</TableCell>
            </TableRow>
        ))}

      </Table>
      </Card>
      </div>
    );
  }
}

export default FacultyDetails;
