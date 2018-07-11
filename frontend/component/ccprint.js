import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
const ipc = require('electron').ipcRenderer;
var marks_entry_database_one_B=new PouchDB('marks_entry_database_one_B');
import PouchDB from 'pouchdb-browser' ;
var student_database_one=new PouchDB('student_database_one')

var tempcc=[]
var enrollid=''


class CC extends Component{
  constructor(props){
    super(props);
    this.state={enrollid:'',startdate:'',endDate:'',todaysDate:'',dob:'',Dob:''}
  };

  printcc=()=>{

    tempcc={name:'',date:'',father_name:'',reg_no:'',dob1:'',
    dob2:'',startdate:'',enddate:'',type:'',year:''}
    student_database_one.find({
     selector: {_id :this.state.enrollid }
   }).then( (result)=> {

    result.docs.forEach((Object)=>{
      tempcc.name=Object.name
      tempcc.date=this.state.todaysDate
      tempcc.father_name=Object.father_name
      tempcc.reg_no=Object._id
      tempcc.dob1=(Object.date1).slice(0,10)
      tempcc.dob2=this.state.d00ob
      tempcc.startdate=this.state.startdate
      tempcc.endDate=this.state.endDate
      tempcc.todaysDate=this.state.todaysDate
    });
      ipc.send('cc',tempcc)
   }).catch(function (err) {
     console.log(err);
   });


  };

handleChange=(name,value)=>{
  this.setState({...this.state,[name]:value})
}

handleChangeEnroll=(name,value)=>{
  enrollid=value
  student_database_one.find({
   selector: {_id :enrollid}
 }).then((result)=> {
  result.docs.forEach((Object)=>{
    this.setState({Dob:(Object.date1).slice(0,10)})
  });
 }).catch(function (err) {
   console.log(err);
 });
  this.setState({...this.state,[name]:value})
}

  render(){
    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
      <Input type='text' label='Enroll ID' name='EnrollID'
        value={this.state.enrollid} icon='person' onChange={this.handleChangeEnroll.bind(this,'enrollid')} />
      <ListItem caption='Date of Birth' legend={this.state.Dob} leftIcon='date_range' />
      <Input type='text' label='DOB full length' name='DOB'
          value={this.state.dob} icon='person' onChange={this.handleChange.bind(this,"dob")} />
      <Input type='date' label='Todays Date' name='todaysDate'
          value={this.state.todaysDate} icon='person' onChange={this.handleChange.bind(this,"todaysDate")} />
      <Input type='date' label='Start Date' name='startdate'
            value={this.state.startdate} icon='person' onChange={this.handleChange.bind(this,"startdate")} />
      <Input type='date' label='End Date' name='endDate'  value={this.state.endDate} icon='person' onChange={this.handleChange.bind(this,"endDate")} />


      <Button label='Print Character Certificate' onClick={this.printcc} accent raised/>
    </div>)
  }
}
export default CC
