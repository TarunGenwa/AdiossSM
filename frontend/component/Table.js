import React, { Component } from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import {Button} from 'react-toolbox/lib/button';
import {student_database_one} from './App';
const data=[];
student_database_one.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
    //console.log(entry.doc);
    data.push(entry.doc);
  });});
const u=[];

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

class TableTest extends Component {


  state = {
    selected: [],
    sorted: 'asc',
    name:''
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    return data.sort(compare);
  };
  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };
  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
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

  handleClickBUtton = (x) => {
    console.log(x)
  };


  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();


    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
      <Input type='text' label='Name' name='name' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} />
       <Card><Button label='Search' raised primary onClick={this.handleClick}/></Card>
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>ID</TableCell>
          <TableCell string>Name</TableCell>
          <TableCell string>Email</TableCell>
          <TableCell string>Phone</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.name) !== -1}>
            <TableCell >{item._id}</TableCell>
            <TableCell >{item.name}</TableCell>
            <TableCell >{item.email}</TableCell>
            <TableCell >{item.phone}</TableCell>
            <TableCell >  <Input type='text' label='Name' name='name' icon='person' value={item.name} /></TableCell>
            </TableRow>
        ))}
      </Table></div>
    );
  }
}

export default TableTest;
