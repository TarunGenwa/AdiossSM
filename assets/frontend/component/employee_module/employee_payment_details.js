import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {finance_database_four_B} from '../App'
import {employee_details_database} from '../App'
PouchDB.plugin(require('pouchdb-find'));

var nam=''
var data2=[];
var data=[];
var salary;
var dt= new Date( );
var payment_type='';
var data_of_date=[];
var data_of_date2=[];
var data_of_date_final=[];
var max;
var difference_days;
var amount_to_pay;
var today_date=new Date().getTime()

employee_details_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
    console.log(entry.doc.name)
    finance_database_four_B.find({
     selector: {name :entry.doc.name }
   }).then(function (result) {
     console.log(result);
     data_of_date=[];
     result.docs.forEach(function(Object){
       console.log(Object)
       payment_type=entry.doc.paymentType
       salary=entry.doc.salary
       console.log(Object.name);
       dt=new Date(Object.dateDES);
      entry.doc.date=Object.date
      console.log(dt)
       data_of_date.push(dt.getTime());
     });

     data_of_date2[entry.doc.name]=data_of_date
     max=Math.max(...data_of_date)
     difference_days=today_date-max

     if(payment_type==='daily'){
       amount_to_pay=Math.round(difference_days/3600/1000/24)*salary
        entry.doc.pay_remaining=amount_to_pay;
               data.push(entry.doc);
     }
     else if (payment_type==='monthly') {
       amount_to_pay=Math.round(difference_days/3600/1000/24/30)*salary
        entry.doc.pay_remaining=amount_to_pay;
               data.push(entry.doc);
     }
     else if (payment_type==='weekly') {
       amount_to_pay=Math.round(difference_days/3600/1000/24/7)*salary
        entry.doc.pay_remaining=amount_to_pay;
               data.push(entry.doc);
     }
     else if (payment_type==='yearly') {
       amount_to_pay=Math.round((difference_days/3600/1000/24/365))*salary
       entry.doc.pay_remaining=amount_to_pay;
       data.push(entry.doc);

     }


   }).catch(function (err) {
     console.log(err);
   });

  });

});




// finance_database_four_B.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
//   docs.rows.forEach(function(entry){
//     console.log('Empolyee payment Detaisl');
//     dt=new Date(entry.doc);
//     console.log(entry.doc);
//   });
//
// });

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

class EmployeePaymentDetails extends Component {
  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:''
  };

  getSortedData = () => {
    if(nam===''){
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
      return data.sort(compare);
    }
    else {
      const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
        return data2.sort(compare);
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
    nam=value
    console.log(value);
    this.setState({...this.state, [name]: value});
    data2=[]
    data.forEach(function(Object){
      if(Object.name===nam){
        data2.push(Object)
      }
    });


  };

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

        <Card>

        <Input type='text' value={this.state.name} icon ='person' label='Enter Full Name' required onChange={this.handleChangeName.bind(this, 'name')}  />

      <Table  style={{ marginTop: 10 }}>
        <TableHead>
          <TableCell onClick={this.handleSortClick} string sorted={sorted}>Name</TableCell>
          <TableCell string>Last Payment Date </TableCell>
          <TableCell string>Salary</TableCell>
          <TableCell string>Payment Type</TableCell>
          <TableCell string>Amount to be Paid</TableCell>
        </TableHead>
        {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
            <TableCell>{item.name}</TableCell>
            <TableCell >{item.date}</TableCell>
            <TableCell >{item.salary}</TableCell>
            <TableCell >{item.paymentType}</TableCell>
            <TableCell >{item.pay_remaining}</TableCell>
            </TableRow>
        ))}

      </Table>

      </Card>
      </div>
    );
  }
}

export default EmployeePaymentDetails;
