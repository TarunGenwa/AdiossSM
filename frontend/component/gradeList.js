import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {attendance_database_three_B} from './App'
import {gradeDefinationDatabase} from './App'
PouchDB.plugin(require('pouchdb-find'));

var data=[]
var changes = gradeDefinationDatabase.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    data=[]
    gradeDefinationDatabase.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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

gradeDefinationDatabase.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
    console.log(entry.doc);
    data.push(entry.doc);
  });});

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

class GradeList extends Component {

  constructor(props) {
    super(props);

      this.state = {
            lowerLimit:'',
            UpperLimit:'',
            grade:'',
            selected: [],
            sorted: 'asc',
            _id:'',
            name:''
          };
          this.baseState = this.state ;
      }



handleChange = (name, value) => {
  this.setState({...this.state, [name]: value});
};


  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
      return data.sort(compare);
  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item]._id) });
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

  handleClickButton=()=>{
    gradeDefinationDatabase.post(this.state).then(function (response) {
        // handle response
  }).catch(function (err) {
    console.log(err);
    });
  };

  DeleteDoc=()=>{
    console.log(this.state.selected);
    this.state.selected.forEach(function(entry){
      gradeDefinationDatabase.get(entry).then(function(doc) {
          return gradeDefinationDatabase.remove(doc);
        }).then(function (result) {
          // handle result
        }).catch(function (err) {
          console.log(err);
        });
    });
    changes()

  };

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();


    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

       
        <Input type='number' label='Lower Limit percent' name='lowerLimit '  icon='keyboard_arrow_up' value={this.state.lowerLimit} onChange={this.handleChange.bind(this, 'lowerLimit')} />
        <Input type='number' label='Upper Limit percent' name='UpperLimit' icon='keyboard_arrow_down' value={this.state.UpperLimit} onChange={this.handleChange.bind(this, 'UpperLimit')} />
        <Input type='text' label='Grade' name='grade' icon='grade' value={this.state.grade} onChange={this.handleChange.bind(this, 'grade')} />
         <Card><Button  label='Add Entry' onClick={this.handleClickButton} accent raised/></Card>

      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>lowerLimit</TableCell>
          <TableCell string>UpperLimit</TableCell>
          <TableCell string>Grade</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell>{item.UpperLimit}</TableCell>
            <TableCell >{item.lowerLimit}</TableCell>
            <TableCell >{item.grade}</TableCell>

            </TableRow>
        ))}

      </Table>
       <Card><Button  label='Delete selected Entry' onClick={this.DeleteDoc} accent raised/></Card>

         
      </div>
    );
  }
}

export default GradeList;
