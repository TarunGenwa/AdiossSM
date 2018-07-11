import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {finance_database_four_B} from '../App'
var desc='';
var amount ='';;
var data=[];
var nam='';
var data_sorted_by_name=[];
var data_sorted_by_date=[];
var date='';
var sliced_date='';


var changes = finance_database_four_B.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]
    finance_database_four_B.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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


finance_database_four_B.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
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



class Employeepayment extends React.Component {

  constructor(props) {
    super(props);
      this.state = {
          name:'',
          payment:'',
          description:'',
          selected: [],
          sorted: 'asc',
          _id:''
        };
      this.baseState = this.state ;
};

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
    date=value.toString();
    sliced_date=date.slice(0,15);
    data_sorted_by_date=[]
    if(date!=='' ){
      console.log(date);
       finance_database_four_B.find({
        selector: {date :sliced_date  }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_date.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
    this.setState({...this.state, [name]: value});
  };



  handleChangePayment = (name, value) => {
    amount=value;
    console.log(value);
    this.setState({...this.state, [name]: value});
  };

  handleChangeDescription = (name, value) => {
    desc=value;
    console.log(value);
    this.setState({...this.state, [name]: value});
  };

  handleClick=()=>{
    this.setState(this.baseState);
    if(desc===''||nam===''||amount===''||date===''){
      alert ('please enter all of the details');
    }
    else{

      finance_database_four_B.post({dateDES:new Date().toISOString(),date:spliced_date,description:desc,name:nam,payment:amount}).then(function(response) {
        console.log(response);
      }).catch(function (err) {
        console.log(err);
      });
    }
  };


    getSortedData = () => {
      const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
      if(date==='' && nam===''){
        return data.sort(compare);
      }
      else if(date !==''){
        return data_sorted_by_date.sort(compare);
      }
      else if( nam!==''){
        return data_sorted_by_name.sort(compare);
      }
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

    handleChangeName = (name, value) => {
      nam=value;
      console.log(value);
      this.setState({...this.state, [name]: value});
      data_sorted_by_name=[]
      if(nam!=='' ){
        console.log(nam);
         finance_database_four_B.find({
          selector: {name :nam }
        }).then(function (result) {
          result.docs.forEach(function(Object){
            data_sorted_by_name.push(Object);
          });
        }).catch(function (err) {
          console.log(err);
        });
      }
    };

    DeleteDoc=()=>{
      console.log(this.state.selected);
      this.state.selected.forEach(function(entry){
        finance_database_four_B.get(entry).then(function(doc) {
            return finance_database_four_B.remove(doc);
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

        <Card>

      <DatePicker icon='event'
          label='Date'
          onChange={this.handleChange.bind(this, 'date1')}
          value={this.state.date1}
          sundayFirstDayOfWeek
          required />

      <Input type='text' value={this.state.name} icon ='person' label='Name' required onChange={this.handleChangeName.bind(this, 'name')}  />
      <Input type='text' value={this.state.payment} icon ='attach_money' label='Amount Paid' required onChange={this.handleChangePayment.bind(this, 'payment')}  />
      <Input type='text' value={this.state.description} icon ='people_outline' label='Employee Designation or Details' required onChange={this.handleChangeDescription.bind(this, 'description')}  />
      <Button label='Make Entry' onClick={this.handleClick} accent raised/>
      <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>Amount in RS Paid</TableCell>
          <TableCell string>Date</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.payment}</TableCell>
            <TableCell >{item.date}</TableCell>
            </TableRow>
        ))}

      </Table>
        <Button label='Delete Selected Entry' onClick={this.DeleteDoc} accent raised/>
      </Card>
      </div>
    );
  }
}

export default Employeepayment;
