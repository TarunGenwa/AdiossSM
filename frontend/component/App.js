import React, { Component } from 'react';
import { Layout } from 'react-toolbox';
import Nav from './Nav';
import store from '../store';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import PouchDB from 'pouchdb-browser' ;
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
const login_details=new PouchDB('login_details');
const attendance_database_three_A= new PouchDB('attendance_database_three_A');
const attendance_database_three_A_temp= new PouchDB('attendance_database_three_A_temp');
const attendance_database_three_B= new PouchDB('attendance_database_three_B');
const classWiseSubjectDB= new PouchDB('classWiseSubjectDB');
const classWiseSubjectFacultyDB= new PouchDB('classWiseSubjectFacultyDB');
const employee_attendance_database= new PouchDB('employee_attendance_database');
const employee_details_database= new PouchDB('employee_details_database');
const employee_details_database_two= new PouchDB('employee_details_database_two');
const feepay_database= new PouchDB('feepay_database');
const finance_database_four_A= new PouchDB('finance_database_four_A');
const finance_database_four_B= new PouchDB('finance_database_four_B');
const main_database_one= new PouchDB('main_database_one');
const main_database_zero= new PouchDB('main_database_zero');
const marks_entry_database_one_B= new PouchDB('marks_entry_database_one_B');
const student_database_one= new PouchDB('student_database_one');
const student_id_database= new PouchDB('student_id_database');
const subjectclass_database= new PouchDB('subjectclass_database');
const student_database_one_temp= new PouchDB('student_database_one_temp');
const gradeDefinationDatabase=new PouchDB('gradeDefinationDatabase');
const activities_entry_database =new PouchDB('activities_entry_database');
const tcDB =new PouchDB('tcDB')


import { observer } from 'mobx-react';
var roles;
var user=''
var pass=''
var xstate;

@observer
class App extends React.Component {
constructor(props) {
      super(props);
        this.state = {
              user: 'admin', password: 'admin',access:false
        }
};
handleChange = (name, value) => {
  user=value
this.setState({...this.state, [name]: value});
};


handleChangePass = (name, value) => {
     pass=value
this.setState({...this.state, [name]: value});
};

click = ()=>{

  if(this.state.user==='admin'&&this.state.password==='admin'){
   this.setState({access:true},()=>{
     roles='admin'
this.props.route.store.auth='admin'
   })
       }

 login_details.get(user).then( (doc)=> {
   if(doc.password===this.state.password){
     this.setState({access:true},()=>{
     roles=doc.roles
     xstate = this.state
     this.props.route.store.auth=roles[0]



     //console.log(roles)
   })
   }
   else{
     alert('username or password incorrect')
   }
 }).catch(function (err) {
   console.log(err);
  //alert('username or password incorrect')
 });

};
accesschanger=()=>{this.setState({access:false})}
    render() {

    if (this.state.access===false)
    {return(<div style={{ flex: 1, overflowX: 'auto', margin: '20% 20% 20% 20%'}}>
    <Card>
    <Input type='text' label='Username' name='user' icon='person' value={this.state.user} onChange={this.handleChange.bind(this, 'user')}  />
    <Input type='password' label='Password' icon='keyboard' value={this.state.password} onChange={this.handleChangePass.bind(this, 'password')}  />
    <Button  label='Login' accent raised onClick={this.click}/>
    </Card>
  </div>)}
    else
      {return (<Layout>
      <Nav click={this.accesschanger.bind(this)}/>
      {this.props.children}
    </Layout>
      )}
  }
}


export  default App;
export {attendance_database_three_A}
export {attendance_database_three_A_temp}
export {attendance_database_three_B}
export {classWiseSubjectDB}
export {classWiseSubjectFacultyDB}
export {employee_attendance_database}
export {employee_details_database}
export {employee_details_database_two}
export {feepay_database}
export {finance_database_four_A}
export {finance_database_four_B}
export {login_details}
export {main_database_one}
export {main_database_zero}
export {marks_entry_database_one_B}
export {student_database_one}
export {student_id_database}
export {subjectclass_database}
export {student_database_one_temp}
export {gradeDefinationDatabase}
export {activities_entry_database}
export {tcDB}
