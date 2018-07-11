import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import {Button} from 'react-toolbox/lib/button';
const data=[];

data.push('Academic-Module')
data.push('Finance-Module')
data.push('Student-Module')
data.push('Employee-Module')

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

class UsernamePasswordGenerator extends Component {

 state = {
   selected: [],
   sorted: 'asc',
   username:'',
   password:'',
   passwordConfirm:''

 };

 getSortedData = () => {
   const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
   return data.sort(compare);
 };
 handleRowSelect = selected => {
   const sortedData = this.getSortedData();
   this.setState({ selected: selected.map(item => sortedData[item]) });
 };

 handleChange = (name, value) => {
   this.setState({...this.state, [name]: value});
 };


 handleSortClick = () => {
   const { sorted } = this.state;
   const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
   this.setState({ sorted: nextSorting });
 };

 handleClickBUtton = () => {
   if(this.state.password===this.state.passwordConfirm){
     console.log(this.state)
       login_details.put({
         _id: this.state.username,
         username: this.state.username,
         password:this.state.password,
         roles:this.state.selected
       }).then(function (response) {
         // handle response
       }).catch(function (err) {
         console.log(err);
         alert('this username is already present')
     });
   }
   else {
     alert('the password does not matches')
   }

 };

 render () {
   const { sorted } = this.state;
   const sortedData = this.getSortedData();


   return (
     <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
     <Input type='text' label='Username' name='username' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'username')} />
       <Input type='password' label='Password' name='password' icon='person' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
       <Input type='password' label='Confirm Password' name='passwordConfirm' icon='person' value={this.state.passwordConfirm} onChange={this.handleChange.bind(this, 'passwordConfirm')} />


     <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
       <TableHead>
         <TableCell onClick={this.handleSortClick} string sorted={sorted}>ID</TableCell>
       </TableHead>
       {sortedData.map((item, idx) => (
           <TableRow key={idx} selected={this.state.selected.indexOf(item) !== -1}>
           <TableCell >{item}</TableCell>
           </TableRow>

       ))}
     </Table>
     <Button label='Generate username' raised primary onClick={this.handleClickBUtton}/>
     </div>
   );
 }
}

export default UsernamePasswordGenerator;
