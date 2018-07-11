import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {classWiseSubjectFacultyDB} from '../App'
var class_value='';
var section_value='';
var data=[];
var data_sorted_by_class=[];
var faculty_name='';
var sub='';


var changes = classWiseSubjectFacultyDB.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]

    classWiseSubjectFacultyDB.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        data_sorted_by_class=[]
        console.log(entry.doc);
        data.push(entry.doc);
      });});
}).on('complete', function(info) {
  // changes() was canceled
  console.log('changes have been made')
}).on('error', function (err) {
  console.log(err);
});

classWiseSubjectFacultyDB.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
   // console.log(entry.doc);
    data.push(entry.doc);
  });

});

const sortByIdAsc = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

const sortByIdDesc = (a, b) => {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
};



class Addsub extends Component {
   constructor(props) {
          super(props);

            this.state = {
                 classvalue:'',sectionvalue:'',Faculty:'',  selected: [],sorted: 'asc',_id:'', name:'',sub_name:''
                               };
                this.baseState = this.state ;
            }
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


  handleChange = (name, value) => {
    sub=value.toUpperCase();
    console.log(value);
    this.setState({...this.state, [name]: value});
  };

  handlefaculty = (name, value) => {
    faculty_name=value.toUpperCase();
    console.log(faculty_name);
    this.setState({...this.state, [name]: value});
  };

  handleclass = (value) =>{
    class_value=value;
    this.setState({classvalue: value});
  };
  handlesection = (value) => {
    section_value=value;
    this.setState({sectionvalue: value});
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByIdAsc : sortByIdDesc;
    if(class_value==='' || section_value===''){
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
    if(class_value!=='' && section_value!=='' ){
        data=[]
       classWiseSubjectFacultyDB.find({
        selector: {class :class_value,
          section:section_value
         }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_class.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }

  };

  handlesection = (value) => {
    data_sorted_by_class=[];

    this.setState({sectionvalue: value});
    console.log(value);
    section_value=value;
    if(class_value!=='' && section_value!=='' ){
      data=[]

       classWiseSubjectFacultyDB.find({
        selector: {section :section_value,
                class:class_value
       }
      }).then(function (result) {
        result.docs.forEach(function(Object){
          data_sorted_by_class.push(Object);
        });
      }).catch(function (err) {
        console.log(err);
      });
    }
}
  submit=()=>{
    if(class_value==='' || section_value==='' || sub===''){
      alert('please enter the class and the section_value and subject');
    }
    else {
      console.log('in the else');
    classWiseSubjectFacultyDB.put({_id:new Date().toISOString(),class:class_value,section:section_value,subject:sub,faculty:faculty_name}).then(function (response) {
              console.log(response);
            }).catch(function (err) {
              alert('Two entries with same ids');
            });
        this.handleclass()
    }


    this.setState(this.baseState)
    };

  DeleteDoc=()=>{
    console.log(this.state.selected);
    this.state.selected.forEach(function(entry){
      classWiseSubjectFacultyDB.get(entry).then(function(doc) {
          return classWiseSubjectFacultyDB.remove(doc);
        }).then(function (result) {
          // handle result
        }).catch(function (err) {
          console.log(err);
        });
    });
    changes()

  };


  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();

    return (

      <div style={{ flex: 1, overflowX: 'auto', padding: '5% 10% 10% 20%' }}>
      <h2> Add Subject </h2>


          <MenuDivider />
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
         <Input type='no' label='Faculty Name' name='faculty' icon='person' value={this.state.Faculty} onChange={this.handlefaculty.bind(this, 'Faculty')} />
         <Input type='no' label='Subject Name' name='subject' icon='subject' value={this.state.sub_name} onChange={this.handleChange.bind(this, 'sub_name')} />
          <Card><Button  label='Add Subject' onClick={this.submit} accent raised/></Card>
         <Table multiSelectable onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
             <TableHead>
                 <TableCell onClick={this.handleSortClick} string sorted={sorted}> Faculty Name</TableCell>
                 <TableCell string>Class</TableCell>
                  <TableCell string>Section</TableCell>
                 <TableCell string>Subject</TableCell>
                </TableHead>
                 {sortedData.map((item, idx) => (
                     <TableRow key={idx} selected={this.state.selected.indexOf(item._id) !== -1}>
                     <TableCell>{item.faculty}</TableCell>
                     <TableCell >{item.class}</TableCell>
                     <TableCell >{item.section}</TableCell>
                     <TableCell >{item.subject}</TableCell>
                     </TableRow>
                 ))}

               </Table>
           <Card><Button label='Delete selected Subject And faculty assignment' onClick={this.DeleteDoc} accent raised/></Card>

      </div>
    );
  }
}

export default Addsub;
