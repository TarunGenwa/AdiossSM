import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {attendance_database_three_A_temp} from './App'
import {student_database_one_temp} from './App'
import {student_database_one} from './App'
import {attendance_database_three_A} from './App'
import {feepay_database} from './App'

PouchDB.plugin(require('pouchdb-find'));

var class_value='';
var section_value='';
var data=[];
var data_sorted_by_class=[];
var temp={};


var changes=student_database_one_temp.changes({
since: 'now',
live: true,
include_docs: true
}).on('change', function(change) {
  console.log('changes are been made')
  data=[]
  student_database_one_temp.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
    docs.rows.forEach(function(entry){
      console.log(entry.doc);
      data.push(entry.doc);

    });
    console.log(data);
  });

}).on('complete', function(info) {
Readmission.forceUpdate()
}).on('error', function (err) {
console.log(err);
});

student_database_one_temp.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
data=[]
docs.rows.forEach(function(entry){
  console.log(entry.doc);
  data.push(entry.doc);
});

});


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

class ReAdmission extends Component {

state = {
  selected: [],
  sorted: 'asc',
  name:'',
  _id:'',
  class:''
};

getSortedData = () => {
  const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
  if(class_value==='' ){
    return data.sort(compare);
  }
  else{
    return data_sorted_by_class.sort(compare);
  }
};


handleRowSelect = selected => {
  const sortedData = this.getSortedData();
  this.setState({ selected: selected.map(item => sortedData[item]._id) });
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
  { value: 12, label: '12th' },

];
section = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B'},
  { value: 'C', label: 'C' }
];
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
handleclass = (value) => {
  data_sorted_by_class=[];
  this.setState({classvalue: value});
  class_value=value;
  console.log(class_value);
  if(class_value!=='' || section_value!=='' ){
    console.log(class_value);
     attendance_database_three_A.find({
      selector: {class :class_value }
    }).then(function (result) {
      result.docs.forEach(function(Object){
        data_sorted_by_class.push(Object);
      });
    }).catch(function (err) {
      console.log(err);
    });
  }

};


handleMarkAdmission=()=>{
  console.log(this.state.selected);
  this.state.selected.forEach(function(entry){
    student_database_one_temp.find({
     selector: {_id :entry }
   }).then(function (result) {
        temp=result.docs[0]
        console.log(result)
        console.log(temp._id);
        temp.classvalue=temp.classvalue+1
         student_database_one.put({_id:temp._id  ,  name: temp.name, phone: temp.phone, email: temp.email, gendervalue:temp.gendervalue, date1: temp.date1, classvalue:temp.classvalue,sectionvalue:temp.sectionvalue, nationality:temp.nationality,
         address_line1: temp.address_line1, address_line2: temp.address_line2, address_City: temp.address_City, address_Pincode: temp.address_Pincode, address_State: temp.address_State
         ,father_age:temp.father_age,father_name:temp.father_name,father_qual:temp.father_qual,father_email:temp.father_email,father_office:temp.father_office,father_mobile:temp.father_mobile,father_occupation:temp.father_occupation,
         father_office_phone:temp.father_office_phone,Mother_age:temp.Mother_age,Mother_name:temp.Mother_name,Mother_qual:temp.Mother_qual,Mother_email:temp.Mother_email,Mother_office:temp.Mother_office,Mother_office_phone:temp.Mother_office_phone,Mother_mobile:temp.Mother_mobile,
         Mother_occupation:temp.Mother_occupation }).then(function (response) {
                console.log('i am here')
                console.log(response);
              }).catch(function (err) {
                console.log('i am here  bitch')
                console.log(err)
              });

        attendance_database_three_A.put({_id:temp._id,name:temp.name,class:temp.classvalue,section:temp.sectionvalue,attendence:''});
        feepay_database.put({_id:temp._id,name:temp.name,class:temp.classvalue,section:temp.sectionvalue,total_fee:''});
        student_database_one_temp.get(entry).then(function(doc) {
          doc._deleted = true;
          return student_database_one_temp.put(doc);
          data=[]
      }).then(function (result) {
        // handle result
      }).catch(function (err) {
        console.log(err);
      });
   }).catch(function (err) {
     console.log('error i shere')
     console.log(err);
   });
  });



};


render () {
  const { sorted } = this.state;
  const sortedData = this.getSortedData();


  return (
    <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>

       

      <Dropdown icon='date_range'
        source={this.Class} // to be pulled from class database ( no. of classes of that school)
        onChange={this.handleclass}
        value={this.state.class} label='Standard' required
      />

    <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
      <TableHead>
        <TableCell onClick={this.handleSortClick} string sorted={sorted}>ID</TableCell>
        <TableCell string>Name</TableCell>
        <TableCell string>Class</TableCell>
        <TableCell string>Section</TableCell>
      </TableHead>
      {sortedData.map((item, idx) => (
          <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
          <TableCell >{item._id}</TableCell>
          <TableCell>{item.name}</TableCell>
          <TableCell >{item.classvalue}</TableCell>
          <TableCell >{item.section}</TableCell>
          </TableRow>
      ))}

    </Table>
     <Card><Button label='Mark Re-Admission of the selected Student ' onClick={this.handleMarkAdmission} accent raised/></Card>
     
    </div>
  );
}
}

export default ReAdmission;
