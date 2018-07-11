import {Id} from './accessOldData';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
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
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
PouchDB.plugin(require('pouchdb-find'));
import {main_database_one} from '../App'
import {main_database_zero} from '../App'
var clas='';
var id=Id;
var subject=[];
var data1=[];
var data_sorted_by_class=[];


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

class OldProfile extends React.Component {
  constructor(props) {
         super(props);

       this.state = {
             _id: '' ,  name: 'Vishal Kumar', phone: '+919954246254', email: 'vishal.km@iitg.ac.in', gendervalue:'Male', date1: '18/04/1998', classvalue:'',sectionvalue:'A', nationality:'Indian',
             address_line1: 'Manas Hostel', address_line2: 'IIT Guwahati', address_City: 'Kamrup', address_Pincode: '781039', address_State: 'Rajasthan'
                 ,father_age:'N/A',father_name:'TejPrakash',father_qual:'N/A',father_email:'N/A',father_office:'N/A',father_mobile:'N/A',father_occupation:'N/A',
                 father_office_phone:'N/A',Mother_age:'40',Mother_name:'Suman',Mother_qual:'Bachelor',Mother_email:'XYZ',Mother_office:'XYZ',Mother_office_phone:'XYZ',Mother_mobile:'XYZ',
                 Mother_occupation:''
               };
               this.baseState = this.state ;
           }

     state1 = {
         index: 1,
         fixedIndex: 1,
         inverseIndex: 1
     };

     state2 = {
       selected: [],
       sorted: 'asc',
       name:''
     };

     state3={
       class:''
     }


    componentDidMount() {
    console.log(this.state._id)
  	setTimeout(function(){ this.state._id = Id; this.forceUpdate() }.bind(this), 1000);

    console.log(this.state._id)
    main_database_zero.find({
     selector: {_id :Id}
   }).then((result)=>{
     console.log('i am in thhis bitch');
      console.log(result)
      this.state=result.docs[0];
    }).catch(function (err) {
       console.log(err);
     });


     console.log(this.state._id)


  }

    getSortedData = () => {
      if(clas===''){
      const compare = this.state2.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
        return data1.sort(compare);
      }
      else{
          const compare = this.state2.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
        return data_sorted_by_class.sort(compare);
      }

    };

    handleRowSelect = selected => {
      const sortedData = this.getSortedData();

      this.setState({ selected: selected.map(item => sortedData[item].subject) });
    };

    handleSortClick = () => {
      const { sorted } = this.state2;
      const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
      this.setState({ sorted: nextSorting });
    };

    handleChangeClass=(name,value)=>{
      clas=value
      console.log(value)
      this.setState({...this.state, [name]: value});
    };

    handleClick=()=>{
      data_sorted_by_class=[]
      if(clas!=='' ){
        console.log(clas);
         main_database_one.find({
          selector: {class :parseInt(clas) }
        }).then(function (result) {
          console.log(result)
          result.docs.forEach(function(Object){
            console.log(result)
            data_sorted_by_class.push(Object);
          });
        }).catch(function (err) {
          console.log(err);
        });
      }


    };

  handleTabChange = (index) => {
    data1=[]
    main_database_one.find({
     selector: {enroll :Id}
   }).then((result)=>{
     console.log(result)
     result.docs.forEach(function(Object){
       console.log(Object)
       data1.push(Object)
     })
     console.log(data1)
  }).catch(function (err) {
       console.log(err);
     });
    this.setState({index});
    console.log(Id);
  };


  render () {
    const { sorted } = this.state2;
    const sortedData = this.getSortedData();


    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
            <h2> Student Profile </h2>

            <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Personal'><ListItem caption="Name" legend={this.state.name}/>

                                <ListItem caption="Date of Birth" legend={this.state.date1}/>
                                <ListItem caption="Father's Name" legend={this.state.father_name}/>
                                <ListItem caption="Phone" legend={this.state.phone}/>
                                <ListItem caption="Email" legend={this.state.email}/>
                                <ListItem caption="Sex" legend={this.state.gendervalue}/>
                                <ListItem caption="Class" legend={this.state.classvalue}/>
                                <ListItem caption="Section" legend={this.state.sectionvalue}/>
                                </Tab>
          <Tab label='Father' onActive={this.handleActive}> <ListItem  legend={this.state.father_name} caption="Name"  />
        <ListItem  legend={this.state.father_age} caption="Age" required/>
        <ListItem  legend={this.state.father_qual} caption="Academic Qualification" />
        <ListItem  legend={this.state.father_occupation} caption="Occupation"/>
        <ListItem  legend={this.state.father_office} caption="Office Address" />
        <ListItem  legend={this.state.father_office_phone} caption="Office Tel.no."/>
        <ListItem  legend={this.state.father_mobile} caption="Mobile" required/>
        <ListItem  legend={this.state.father_email} caption="E-mail"/></Tab>
          <Tab label='Mother' >  <ListItem  legend={this.state.Mother_name} caption="Name"   />
        <ListItem  legend={this.state.Mother_age} caption="Age" required/>
        <ListItem  legend={this.state.Mother_qual} caption="Academic Qualification" />
        <ListItem  legend={this.state.Mother_occupation} caption="Occupation"/>
        <ListItem  legend={this.state.Mother_office} caption="Office Address" />
        <ListItem  legend={this.state.Mother_office_phone} caption="Office Tel.no."/>
        <ListItem  legend={this.state.Mother_mobile} caption="Mobile" required/>
        <ListItem  legend={this.state.Mother_email} caption="E-mail"/></Tab>
          <Tab label='Address'><ListItem  legend={this.state.address_line1} caption='Address Line 1'/>
        <ListItem  legend={this.state.address_line2} caption='Address Line 2'/>
        <ListItem  legend={this.state.address_Pincode} caption='Pincode'/>
        <ListItem  legend={this.state.address_City} />
        <ListItem  legend={this.state.address_State} caption='State'/></Tab>
         <Tab label='Attendance Record'> </Tab>
         <Tab label='Academic Record'>
         <div style={{ flex: 1, overflowX: 'auto' }}>
          
         <Input type='text' label='Class' name='class' icon='person' value={this.state3.clas} onChange={this.handleChangeClass.bind(this, 'class')} />
          <Card><Button label='Search' raised primary onClick={this.handleClick}/></Card>
         <Table  onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
           <TableHead>
             <TableCell onClick={this.handleSortClick} string sorted={sorted}>Subject Name</TableCell>
             <TableCell string>Marks</TableCell>
            <TableCell string>Class</TableCell>
             <TableCell string>Section</TableCell>

           </TableHead>
           {sortedData.map((item, idx) => (
               <TableRow key={idx} selected={this.state2.selected.indexOf(item.subject) !== -1}>
               <TableCell >{item.subject}</TableCell>
               <TableCell >{item.marks}</TableCell>
               <TableCell >{item.class}</TableCell>
               <TableCell >{item.section}</TableCell>
               </TableRow>
           ))}

         </Table>
          
         </div>
         </Tab>

        </Tabs>


            </div>
    );
  }
}




export default OldProfile;
