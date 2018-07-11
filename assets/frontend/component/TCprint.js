import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
const ipc = require('electron').ipcRenderer;

class TC extends Component{
  constructor(props){
    super(props);
    this.state={enrollid:''}
  };
  printtc=()=>{
    ipc.send('tc',this.state)
  };
  printcc=()=>{
    ipc.send('cc',this.state)
  };
  printms=()=>{
    ipc.send('ms',this.state)
  };
handleChange=(value)=>{
  this.setState({enrollid:value})
}
  render(){
    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
      <Input type='text' label='Enroll ID' name='EnrollID'
        value={this.state.enrollid} icon='person' onChange={this.handleChange.bind(this)} />
      <Button label='Print Transfer Certificate' onClick={this.printtc} accent raised/>
      <Button label='Print Character Certificate' onClick={this.printcc} accent raised/>
      <Button label='Print Marksheet' onClick={this.printms} accent raised/>
    </div>)
  }
}
export default TC
