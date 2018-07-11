import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
const ipc = require('electron').ipcRenderer;
var marks_entry_database_one_B=new PouchDB('marks_entry_database_one_B');
import PouchDB from 'pouchdb-browser' ;
import  {student_database_one} from './App'
import {tcDB} from './App'
PouchDB.plugin(require('pouchdb-find'));

var tempcc=[]
var temp
var enrollid=''


class TC extends Component{
  constructor(props){
    super(props);
    this.state={enrollid:''}
  };

  printcc=()=>{

    var id=this.state.enrollid
    student_database_one.find({
     selector: {_id :id}
   }).then( (result)=> {
        result.docs.forEach((Object)=>{
        temp=Object
        tempcc.push(temp)
        console.log(temp);
        });

        tcDB.find({
          selector: {enroll :id}
          }).then( (result)=> {
            result.docs.forEach((Object)=>{
            tempcc.push(Object)
          });
              ipc.send('tc',tempcc)
          }).catch(function (err) {
              console.log(err);
          });
      }).catch(function (err) {
          console.log(err);
      });



  };

handleChangeEnroll=(name,value)=>{
  this.setState({...this.state,[name]:value})
}



  render(){
    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
      <Input type='text' label='Enroll ID' name='EnrollID'
        value={this.state.enrollid} icon='person' onChange={this.handleChangeEnroll.bind(this,'enrollid')} />
      <Button label='Print Transfer Certificate' onClick={this.printcc} accent raised/>
    </div>)
  }
}
export default TC
