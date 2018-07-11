import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import {Button} from 'react-toolbox/lib/button';
import {main_database_one} from '../App'
import {main_database_zero} from '../App'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

import {Link} from 'react-toolbox/lib/link';
PouchDB.plugin(require('pouchdb-find'));

const data=[];
var nam='';
var data_sorted_by_name=[];
var Id;

main_database_zero.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
    console.log(entry.doc);
    data.push(entry.doc);
  });});


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

class OldDataBaseFindStudent extends Component {
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
    nam=value;
    console.log(value)
    this.setState({...this.state, [name]: value});
  };

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();

    this.setState({ selected: selected.map(item => sortedData[item]._id) });
  };

  handleClick=()=>{
    data_sorted_by_name=[]
    console.log(nam)
    if(nam!=='' ){
      console.log(nam);
       main_database_zero.find({
        selector: {name :nam }
      }).then(function (result) {
        console.log(result)
        result.docs.forEach(function(Object){
          console.log(result)
          data_sorted_by_name.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
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
      <Card>
      <Input type='text' label='Name' name='name' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
      <Button label='Search' raised primary onClick={this.handleClick}/>
      <Table  onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>ID</TableCell>
          <TableCell string>Name</TableCell>
          <TableCell string>Father/Guardian</TableCell>
          <TableCell string>Last Class Attended/Completed</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell >{item._id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.father_name}</TableCell>
            <TableCell >{item.classvalue}</TableCell>
            </TableRow>
        ))}

      </Table>
     <Button  icon='done' href="#/OldProfile" label='View Selected Profile' onClick={this.handleProfileClick} accent raised/>
     </Card>
      </div>
    );
  }
}
export {Id};

export default OldDataBaseFindStudent;
