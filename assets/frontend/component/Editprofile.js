import {Id} from './student_module/find_student';
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
import {attendance_database_three_A} from './App'
import {attendance_database_three_A_temp} from './App'
import {attendance_database_three_B} from './App'
import {classWiseSubjectDB} from './App'
import {classWiseSubjectFacultyDB} from './App'
import {employee_attendance_database} from './App'
import {employee_details_database} from './App'
import {employee_details_database_two} from './App'
import {feepay_database} from './App'
import {finance_database_four_A} from './App'
import {finance_database_four_B} from './App'
import {login_details} from './App'
import {main_database_one} from './App'
import {main_database_zero} from './App'
import {marks_entry_database_one_B} from './App'
import {student_database_one} from './App'
import {student_id_database} from './App'
import {subjectclass_database} from './App'



class EditProfile extends React.Component {
        constructor(props) {
          super(props);

             this.state = {
                  _id: '' ,  name: '', phone: '', email: '', gendervalue:'Male', date1: '', classvalue:'',sectionvalue:'', nationality:'Indian',
                  address_line1: '', address_line2: '', address_City: '', address_Pincode: '', address_State: 'Rajasthan',
                  perm_address_line1: '', perm_address_line2: '', perm_address_City: '', perm_address_Pincode: '', perm_address_State: 'Rajasthan',father_age:'',father_name:'',father_qual:'',father_email:'',father_office:'',father_mobile:'',father_occupation:'',
                  father_office_phone:'',Mother_age:'',Mother_name:'',Mother_qual:'',Mother_email:'',Mother_office:'',Mother_office_phone:'',Mother_mobile:'',
                  Mother_occupation:'',lastclass:'',lastclassmarks:'',lastclasspercentage:'',guardian:'',guardian_relation:'',Index: 1
                };
                
            }
              handleTabChange = (index) => {
    this.setState({index});
  };
componentWillMount(){
setTimeout(function(){ this.state._id = Id; this.forceUpdate() }.bind(this), 500);
    student_database_one.find({
     selector: {_id :Id}
   }).then((result)=>{
      this.state=result.docs[0];
      this.baseState = this.state;
    }).catch(function (err) {
       console.log(err);
     });
    
     console.log(this.state._id)


}

  handleClick = () => {
    console.log(this.state);
    //this.state._id = new Date().toISOString();
    if(this.state.name === '' || this.state._id===''){
      return (
        alert('Enter the id or the name')
      );
    }
    else {
        student_database_one.get(this.state._id).then((doc)=> {
          console.log('lund')
          console.log(doc)
           return student_database_one.put({
           _id: doc._id,
           _rev: doc._rev,
            name:this.state.name, phone: this.state.phone, email:this.state.email, gendervalue:this.state.gendervalue, date1:this.state.date1, classvalue:this.state.classvalue,sectionvalue:this.state.sectionvalue, nationality:this.state.nationality,
                  address_line1: this.state.addressline1, address_line2:this.state.address_line2, address_City:this.state.address_City, address_Pincode:this.state.address_Pincode, address_State: 'Rajasthan',
                  perm_address_line1: this.state.addressline1, perm_address_line2:this.state.address_line2, perm_address_City:this.state.address_City, perm_address_Pincode:this.state.address_Pincode, perm_address_State: 'Rajasthan',father_age:this.state.father_age,father_name:this.state.father_name,father_qual:this.state.father_qual,father_email:this.state.father_email,father_office:this.state.father_office,father_mobile:this.state.father_mobile,father_occupation:this.state.father_occupation,
                  father_office_phone:this.state.father_office_phone,Mother_age:this.state.Mother_age,Mother_name:this.state.Mother_name,Mother_qual:this.state.Mother_qual,Mother_email:this.state.Mother_email,Mother_office:this.state.Mother_office,Mother_office_phone:this.state.Mother_office_phone,Mother_mobile:this.state.Mother_mobile,
                  Mother_occupation:this.state.Mother_occupation,lastclass:this.state.lastclass,lastclassmarks:this.state.lastclassmarks,lastclasspercentage:this.state.lastclasspercentage,guardian:this.state.guardian,guardian_relation:this.state.guardian_relation,Index: 1
         });
          }).then(function(response) {
            // handle response
          }).catch(function (err) {
          console.log(err);
        });
        
        attendance_database_three_A.get(this.state._id).then((doc)=> {
           return attendance_database_three_A.put({
           _id: doc._id,
           _rev: doc._rev,
          name:this.state.name,class:this.state.classvalue,section:this.state.sectionvalue,attendence:''
         });
          }).then(function(response) {
            // handle response
          }).catch(function (err) {
          console.log(err);
        });
        
           feepay_database.get(this.state._id).then((doc) =>{
           return feepay_database.put({
           _id: doc._id,
           _rev: doc._rev,
          name:this.state.name,class:this.state.classvalue,section:this.state.sectionvalue,totalFee:'',totalFeePaid:'',feeCycle:'',dateOfPayment:{_id: new Date().toISOString(), feepaid:0}
         });
          }).then(function(response) {
            // handle response
          }).catch(function (err) {
          console.log(err);
        });
        
         
           subjectclass_database.get(this.state._id).then((doc) =>{
           return subjectclass_database.put({
           _id: doc._id,
           _rev: doc._rev,
          name:this.state.name,class:this.state.classvalue,section:this.state.sectionvalue,subject:''
         });
          }).then(function(response) {
            // handle response
          }).catch(function (err) {
          console.log(err);
        });
    }
  };

  resetForm = () => {
      this.setState(this.baseState);
  }
  handleChange = (name, value) => {
    console.log(value);
    this.setState({...this.state, [name]: value});
    console.log(value);
  };
handlegender = (value) => {
    this.setState({gendervalue: value});
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
  handlesection =(value)=>{
    this.setState({sectionvalue: value});
  };
  Class = [
    { value: 1, label: '1st' },
    { value: 2, label: '2nd'},
    { value: 3, label: '3rd' },
    { value: 4, label: '4th' },
    { value: 5, label: '5th'},
    { value: 6, label: '6th' },
    { value: 7, label: '7th' },
    { value: 8, label: '8th'},
    { value: 9, label: '9th' },
    { value: 10, label: '10th' },
    { value: 11, label: '11th'},
    { value: 12, label: '12th' }
  ];

  section = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B'},
    { value: 'C', label: 'C' }
  ];
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
        <h2>Personal</h2>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Personal'>
        <Input type='text' label='Name' name='name' icon='person' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} required />
        <DatePicker icon='cake'
          label='Birthdate'
          onChange={this.handleChange.bind(this, 'date1')}
          value={this.state.date1}
          sundayFirstDayOfWeek
          required />
          <DatePicker icon='date_range'
          label='Birthdate'
          onChange={this.handleChange.bind(this, 'dateofadmission')}
          value={this.state.dateofadmission}
          sundayFirstDayOfWeek
          required />
        <Dropdown icon='face'
          source={this.gendersx}
          onChange={this.handlegender}
          value={this.state.gendervalue} label='Gender' required
        />
        <Dropdown icon='class'
          source={this.Class} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handleclass}
          value={this.state.classvalue} label='Standard' required
        />
        <Dropdown icon='label'
          source={this.section} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handlesection}
          value={this.state.sectionvalue} label='Section' required
        />

        <Input type='email' label='Email address' icon='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
        <Input type='tel' label='Phone' name='phone' icon='phone' value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
        <Input type='text' label='enroll' name='Enrollment id' icon='note_add' value={this.state._id} onChange={this.handleChange.bind(this, '_id')} disabled/>
        <Input type='text' label='Guardian' name='Guardian' icon='face' value={this.state.guardian} onChange={this.handleChange.bind(this, 'guardian')} />
        <Input type='text' label='Relation with Student' name='Enrollment id' icon='face' value={this.state.guardian_relation} onChange={this.handleChange.bind(this, 'guardian_relation')} />
        
        <Input type='text' label='Nationality' name='nationality' icon='flag' value={this.state.nationality} onChange={this.handleChange.bind(this, 'nationality')} />
        <Input type='text' label='Religion' name='Religion' icon='people' value={this.state.religion} onChange={this.handleChange.bind(this, 'religion')} />
        <Dropdown icon='people_outline'
          source={this.cat} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handlecat}
          value={this.state.catvalue} label='Category' required
        />
        </Tab><Tab label='Previous Academic Details'>
          <Input type='text' label='Last School Attended' name='last-school' icon='school' value={this.state.lastschool} onChange={this.handleChange.bind(this, 'lastschool')} />
        <Input type='text' label='Last Class Attended (Result)' name='last-school' icon='school' value={this.state.lastclass} onChange={this.handleChange.bind(this, 'lastclass')} />
        <Input type='text' label='Last Class Marks' name='last-school' icon='school' value={this.state.lastclassmarks} onChange={this.handleChange.bind(this, 'lastclassmarks')} />
        <Input type='text' label='Last Class %' name='last-school' icon='school' value={this.state.lastclasspercentage} onChange={this.handleChange.bind(this, 'lastclasspercentage')} />
        </Tab>
        <Tab label='Address'>
        <h5> Present Residential Address </h5>
        <Input type='text' value={this.state.address_line1} label='Address Line 1' required onChange={this.handleChange.bind(this, 'address_line1')}  />
        <Input type='text' value={this.state.address_line2} label='Address Line 2' required onChange={this.handleChange.bind(this, 'address_line2')}  />
        <Input type='text' value={this.state.address_Pincode} label='Pincode' required onChange={this.handleChange.bind(this, 'address_Pincode')}  />
        <Input type='text' value={this.state.address_City} label='City' required onChange={this.handleChange.bind(this, 'address_City')}  />
        <Input type='text' value={this.state.address_State} label='State' required onChange={this.handleChange.bind(this, 'address_State')}  />
        <h5> Permanent Address </h5>
        <Input type='text' value={this.state.perm_address_line1} label='Address Line 1' required onChange={this.handleChange.bind(this, 'perm_address_line1')}  />
        <Input type='text' value={this.state.perm_address_line2} label='Address Line 2' required onChange={this.handleChange.bind(this, 'perm_address_line2')}  />
        <Input type='text' value={this.state.perm_address_Pincode} label='Pincode' required onChange={this.handleChange.bind(this, 'perm_address_Pincode')}  />
        <Input type='text' value={this.state.perm_address_City} label='City' required onChange={this.handleChange.bind(this, 'perm_address_City')}  />
        <Input type='text' value={this.state.perm_address_State} label='State' required onChange={this.handleChange.bind(this, 'perm_address_State')}  />
        </Tab>
        <Tab label='Father'>

        <Input type='text' value={this.state.father_name} label='Name' required onChange={this.handleChange.bind(this, 'father_name')}  />
        <Input type='text' value={this.state.father_age} label='Age' required onChange={this.handleChange.bind(this, 'father_age')}  />
        <Input type='text' value={this.state.father_qual} label='Academic Qualification' required onChange={this.handleChange.bind(this, 'father_qual')}  />
        <Input type='text' value={this.state.father_occupation} label='Occupation' required onChange={this.handleChange.bind(this, 'father_occupation')}  />
        <Input type='text' value={this.state.father_office} label='Office Address' required onChange={this.handleChange.bind(this, 'father_office')}  />
        <Input type='text' value={this.state.father_office_phone} label='Office Tel.no.' required onChange={this.handleChange.bind(this, 'father_office_phone')}  />
        <Input type='text' value={this.state.father_mobile} label='Mobile' required onChange={this.handleChange.bind(this, 'father_mobile')}  />
        <Input type='text' value={this.state.father_email} label='E-mail' required onChange={this.handleChange.bind(this, 'father_email')}  />
        </Tab>
        <Tab label='Mother'>

        <Input type='text' value={this.state.Mother_name} label='Name' required onChange={this.handleChange.bind(this, 'Mother_name')}  />
        <Input type='text' value={this.state.Mother_age} label='Age' required onChange={this.handleChange.bind(this, 'Mother_age')}  />
        <Input type='text' value={this.state.Mother_qual} label='Academic Qualification' required onChange={this.handleChange.bind(this, 'Mother_qual')}  />
        <Input type='text' value={this.state.Mother_occupation} label='Occupation' required onChange={this.handleChange.bind(this, 'Mother_occupation')}  />
        <Input type='text' value={this.state.Mother_office} label='Office Address' required onChange={this.handleChange.bind(this, 'Mother_office')}  />
        <Input type='text' value={this.state.Mother_office_phone} label='Office Tel.no.' required onChange={this.handleChange.bind(this, 'Mother_office_phone')}  />
        <Input type='text' value={this.state.Mother_mobile} label='Mobile' required onChange={this.handleChange.bind(this, 'Mother_mobile')}  />
        <Input type='text' value={this.state.Mother_email} label='E-mail' required onChange={this.handleChange.bind(this, 'Mother_email')}  />
        </Tab>
        </Tabs>
        <div style={{ flex: 1, overflowX: 'auto', padding: '1.8rem' }}>
        <Button  label='Save Changes' raised primary onClick={this.handleClick} />
        <Button  label='Undo Changes' onClick={this.resetForm} accent raised/>
        </div>
      </section>
      </div>
    );
  }
}
export default EditProfile;
