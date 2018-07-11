import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import {Button} from 'react-toolbox/lib/button';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {student_database_one} from '../App'
import {Link} from 'react-toolbox/lib/link';
PouchDB.plugin(require('pouchdb-find'));
var data=[];
var nam='';
var data_sorted_by_name=[];
var Id;

var changes = student_database_one.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]
    student_database_one.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        //console.log(entry.doc);
        data.push(entry.doc);
      });});
}).on('complete', function(info) {
  // changes() was canceled
  console.log('changes have been made')
}).on('error', function (err) {
  console.log(err);
});

student_database_one.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
  //  console.log(entry.doc);
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

class FindStudent extends Component {
  state = {
    selected: [],
    sorted: 'asc',
    name:''
  };



  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    if( nam===''){
      return data.sort(compare);
    }
    else {
      return data_sorted_by_name.sort(compare);
    }
  };
  handleChange = (name, value) => {
    nam=value.toUpperCase();
    console.log(value)
    this.setState({...this.state, [name]: value});
    data_sorted_by_name=[]
    console.log(nam)
    if(nam!=='' ){
      console.log(nam);
       student_database_one.find({
        selector: {name :nam }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          console.log(result)
          data_sorted_by_name.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();

    this.setState({ selected: selected.map(item => sortedData[item]._id) });
  };


  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  handleProfileClick=(x)=>{
    Id=this.state.selected[0]
    console.log(this.state.selected[0]);
  };


  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();

    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

      <Input type='text' label='Name' name='name' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
      <Table  onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>ID</TableCell>
          <TableCell string>Name</TableCell>
          <TableCell string>CLass</TableCell>
          <TableCell >Section</TableCell>
          <TableCell string>Phone</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell >{item._id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.classvalue}</TableCell>
            <TableCell >{item.sectionvalue}</TableCell>
            <TableCell >{item.phone}</TableCell>
            </TableRow>
        ))}

      </Table>
      <Card><Button  href="#/Profile" label='View Selected Profile' onClick={this.handleProfileClick} accent raised/></Card>

      </div>
    );
  }
}
export {Id};

export default FindStudent;
