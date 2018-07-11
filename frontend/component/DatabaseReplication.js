import fs from 'fs'
import * as firebase from "firebase";
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import replicationStream from 'pouchdb-replication-stream'
import {attendance_database_three_A} from './App' /* */
import {attendance_database_three_A_temp} from './App'/* */
import {attendance_database_three_B} from './App' /* */
import {classWiseSubjectDB} from './App'  /**/
import {classWiseSubjectFacultyDB} from './App' /* */
import {employee_attendance_database} from './App' /** */
import {employee_details_database} from './App'/** */
import {employee_details_database_two} from './App'
import {feepay_database} from './App'     /* */
import {finance_database_four_A} from './App'
import {finance_database_four_B} from './App'
import {login_details} from './App'
import {main_database_one} from './App'
import {main_database_zero} from './App'
import {marks_entry_database_one_B} from './App'
import {student_database_one} from './App' /* */
import {student_id_database} from './App'   /* */
import {subjectclass_database} from './App'
PouchDB.plugin(require('pouchdb-find'));
PouchDB.plugin(replicationStream.plugin);

PouchDB.adapter('writableStream', replicationStream.adapters.writableStream)
//  PouchDB.adapter('readableStream', replicationStream.adapters.readableStream)
var load = require('pouchdb-load');
 var config = {
    apiKey: "AIzaSyApMJaC5K625fcBrbO1qtjTASHKdOx96t8",
    authDomain: "erpx-aa6bd.firebaseapp.com",
    databaseURL: "https://erpx-aa6bd.firebaseio.com",
    projectId: "erpx-aa6bd",
    storageBucket: "erpx-aa6bd.appspot.com",
    messagingSenderId: "583015456251"
  };
var app=  firebase.initializeApp(config);
var database = app.database();
var student_data=[],student_id_data=[],student_attendance=[],fee_data=[],attendance_temp=[],student_attendance_3b=[],class_subDB=[],class_fac_DB=[],employee_attendance=[],employee_details=[]
PouchDB.plugin({
  loadIt: load.load
});


var rs = fs.createReadStream('output.txt');

student_database_one.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        student_data.push(entry.doc);
      });})
student_id_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        student_id_data.push(entry.doc);
      });})
attendance_database_three_A.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        student_attendance.push(entry.doc);
      });})
feepay_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        fee_data.push(entry.doc);
      });})
attendance_database_three_A_temp.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        attendance_temp.push(entry.doc);
      });})
attendance_database_three_B.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        student_attendance_3b.push(entry.doc);
      });})
classWiseSubjectDB.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        class_subDB.push(entry.doc);
      });})

classWiseSubjectFacultyDB.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        class_fac_DB.push(entry.doc);
      });})
employee_attendance_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        employee_attendance.push(entry.doc);
      });})
employee_details_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        employee_details.push(entry.doc);
      });})      
class Datarep extends Component {


firebasefunc(){

 database.ref('student').set(student_data);
 database.ref('id').set(student_id_data);
 database.ref('attendance').set(student_attendance);
 database.ref('feepay').set(fee_data);

}

firebaseRead(){

database.ref('student').once('value').then(function(snapshot) {
var student_data_backup = snapshot.val();
console.log(student_data_backup);
}
)


}




  render () {

    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
        <h2>Backup & Sync </h2>

        <MenuDivider />
        <h3> Online </h3>
        <MenuDivider />
         <Card><Button  label='Backup' onClick={this.firebasefunc} raised accent icon='backup' /></Card>
         <Card><Button  label='Restore' onClick={this.firebaseRead} accent raised flat/></Card>

      </div>
    );
  }
}

export default Datarep;
