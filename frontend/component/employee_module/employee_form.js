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
import {employee_details_database} from '../App'
import {finance_database_four_B} from '../App'


var date=''
var spliced_date=''
class EmployeeForm extends React.Component {
        constructor(props) {
          super(props);

            this.state = {
                  _id: '' ,  name: '', phone: '', email: '', gendervalue:'Male', nationality:'Indian',
                  address_line1: '', address_line2: '', address_City: '', address_Pincode: '', address_State: 'Rajasthan'
                  ,father_name:'',catvalue:'',salary:'',paymentType:''
                };
                this.baseState = this.state ;
            }
              handleTabChange = (index) => {
    this.setState({index});
  };


  handleClick = () => {
    console.log(this.state);
    var name=(this.state.name).toUpperCase()
    if(this.state.name==='' || this.state.salary==='' || this.state.paymentType===  ''){
      alert('please fill all the required fields');
    }else{
      this.state._id = new Date().toISOString();
      employee_details_database.put(this.state);
      date=new Date().toString();
      spliced_date=date.slice(0,15);
      console.log(spliced_date);
      finance_database_four_B.post({dateDES:new  Date().toISOString(),date:spliced_date,description:'',name:this.state.name,payment:'0'}).then(function(response) {
        console.log(response);
      }).catch(function (err) {
        console.log(err);
      });
      console.log(this.state);
      this.setState(this.baseState);
    }

  };

  resetForm = () => {
      this.setState(this.baseState);
  }
  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
  };

  handlegender = (value) => {
    this.setState({gendervalue: value});
  };

  payment_type = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'weekly', label: 'Weekly'},
    { value: 'yearly', label: 'Yearly' },
    { value: 'daily', label: 'Daily' }
  ];

  handlePayment = (value) => {
    this.setState({paymentType: value});
  };


  gendersx = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female'},
    { value: 'Other', label: 'Other' }
  ];
  address = {line1: '', line2:'', City:'',Pincode:'', State:''};
  handleclass = (value) => {
    this.setState({classvalue: value});
  };
   cat= [
    { value: 'G', label: 'General' },
    { value: 'OBC', label: 'OBC'},
    { value: 'SC', label: 'SC' },
    { value: 'ST', label: 'ST' }
  ];
  handlecat = (value) => {
    this.setState({catvalue: value});
  };
  render () {
    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

      <section>
        <h2>Add New Employee</h2>
        <MenuDivider />
        <Input type='text' label='Name' name='name' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required/>
        <DatePicker icon='cake'
          label='Birthdate'
          onChange={this.handleChange.bind(this, 'date1')}
          value={this.state.date1}
          sundayFirstDayOfWeek
          required />
        <Dropdown icon='face'
          source={this.gendersx}
          onChange={this.handlegender}
          value={this.state.gendervalue} label='Gender' required
        />
        <Input type='email' label='Email address' icon='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
        <Input type='tel' label='Phone' name='phone' icon='phone' value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
        <Input type='text' label='Nationality' name='nationality' icon='flag' value={this.state.nationality} onChange={this.handleChange.bind(this, 'nationality')} />
        <Input type='text' label='Salary in RS' name='salary' icon='people' value={this.state.salary} onChange={this.handleChange.bind(this, 'salary')} />
        <Dropdown icon='face'
          source={this.payment_type}
          onChange={this.handlePayment}
          value={this.state.paymentType} label='Payment Type' required
        />
        <Input type='text' label='Religion' name='Religion' icon='people' value={this.state.religion} onChange={this.handleChange.bind(this, 'religion')} />
        <Dropdown icon='people_outline'
          source={this.cat} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handlecat}
          value={this.state.catvalue} label='Category' required
        />
        <h2>Address</h2>
        <MenuDivider />
        <h5> Permanent Address </h5>
        <Input type='text' value={this.state.address_line1} label='Address Line 1' required onChange={this.handleChange.bind(this, 'address_line1')}  />
        <Input type='text' value={this.state.address_line2} label='Address Line 2' required onChange={this.handleChange.bind(this, 'address_line2')}  />
        <Input type='text' value={this.state.address_Pincode} label='Pincode' required onChange={this.handleChange.bind(this, 'address_Pincode')}  />
        <Input type='text' value={this.state.address_City} label='City' required onChange={this.handleChange.bind(this, 'address_City')}  />
        <Input type='text' value={this.state.address_State} label='State' required onChange={this.handleChange.bind(this, 'address_State')}  />
        <h2> Father </h2>
        <Input type='text' value={this.state.father_name} label='Name' required onChange={this.handleChange.bind(this, 'father_name')}  />
        <div style={{ flex: 1, overflowX: 'auto', padding: '1.8rem' }}>
         <Card><Button  label='Add Details' raised primary onClick={this.handleClick} /></Card>
         <Card><Button  label='Reset' onClick={this.resetForm} accent raised/></Card>
        </div>
      </section>
      </div>
    );
  }
}
export default EmployeeForm;
