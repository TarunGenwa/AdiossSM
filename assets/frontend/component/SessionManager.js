import React, { Component } from 'react';
import { AppBar, Checkbox, IconButton, Button} from 'react-toolbox';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import Navigation from 'react-toolbox/lib/navigation';
import Input from 'react-toolbox/lib/input';
import {Tab, Tabs} from 'react-toolbox';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {student_database_one} from './App'
import {marks_entry_database_one_B} from './App'
import {main_database_zero} from './App'
import {main_database_one} from './App'
import {attendance_database_three_A} from './App'
import {feepay_database} from './App'
import {student_database_one_temp} from './App'
import {attendance_database_three_A_temp} from './App'
var flag=0;

class Session extends React.Component {
        constructor(props) {
          super(props);

            this.state = {
                    name: ''
                };
                this.baseState = this.state ;
            }
              handleTabChange = (index) => {
    this.setState({index});
  };

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handleClick1=()=>{
    flag=1
    student_database_one.replicate.to(main_database_zero).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });

    marks_entry_database_one_B.replicate.to(main_database_one).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });

    student_database_one.replicate.to(student_database_one_temp).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });

    attendance_database_three_A.replicate.to(attendance_database_three_A_temp).then(function (result) {
      console.log(result);
    }).catch(function (err) {
      console.log(err);
    });
  }

  handleClick=()=>{
    if(flag===1){
      console.log('they are destroyed');
      student_database_one.destroy()
      marks_entry_database_one_B.destroy()
      feepay_database.destroy()
      attendance_database_three_A.destroy()
    }
    else{
      alert('Do you want to continue without making BackUp it is recommended to have a backup');
    }
  }

  render () {
    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

      <section>
        <h2>Personal</h2>
        <MenuDivider />
        <Input type='text' label='New Session Name' name='name' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required/>

        <div style={{ flex: 1, overflowX: 'auto', padding: '1.8rem' }}>
        <Button  label='Make BackUp' raised accent onClick={this.handleClick1} />
        <a href="#/Readmission"><Button  label='Start Readmission' raised primary onClick={this.handleClick} /></a>
        </div>
      </section>
      </div>
    );
  }
}
export default Session;
