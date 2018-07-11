import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import {feepay_database} from '../App'
import {attendance_database_three_A} from '../App'
PouchDB.plugin(require('pouchdb-find'));


var class_value='';
var section_value='';
var data=[];
var data_sorted_by_class=[];
var date='';
var cycle_value='';
var total_fee=0;


var changes = feepay_database.changes({
  since: 'now',
  live: true,
  include_docs: true
}).on('change', function(change) {
    console.log('changes are been made')
    data=[]
    feepay_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
      docs.rows.forEach(function(entry){
        console.log(entry.doc);
        data.push(entry.doc);
      });});
}).on('complete', function(info) {
  // changes() was canceled
  console.log('changes have been made')
}).on('error', function (err) {
  console.log(err);
});



feepay_database.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
   if(entry.doc.feeCycle==='' || entry.doc.totalFee===''){
      data.push(entry.doc);
    }
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

class feeassign extends Component {
  state = {
    selected: [],
    sorted: 'asc',
    _id:'',
    name:'',
    total_fee:''
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

  handleChange = (name, value) => {
    this.setState({...this.state, [name]: value});
    total_fee=value;
  };;

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
  cycle = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Quaterly', label: 'Quaterly'},
    { value: 'Semi-Annual', label: 'Semi-Annual' },
    { value: 'Annual', label: 'Annual' }
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
    if(class_value!=='' && section_value!=='' ){
      console.log(class_value);
       feepay_database.find({
        selector: {class :class_value ,
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
       feepay_database.find({
        selector: {section :section_value
          ,class:class_value
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

  handlecycle = (value) => {
      this.setState({cyclevalue: value});
      cycle_value=value;
  };

  assignFee=()=>{
  //  console.log(total_fee);
    //console.log(cycle_value);
    //console.log(this.state.selected);
    this.state.selected.forEach(function(Object){

      feepay_database.get(Object).then(function(doc) {
        console.log(doc.name)
        return feepay_database.put({
            _id:doc._id,
            _rev: doc._rev,
            class:doc.class,
            name:doc.name,
            section:doc.section,
            totalFee:total_fee,
            feeCycle:cycle_value,
            totalFeePaid:0,
            dateOfPayment:{_id: new Date().toISOString(),amountPaid:0}
        });
      }).then(function(response) {
        // handle response
      }).catch(function (err) {
        console.log(err);
      });


    });

  }

  render () {
    const { sorted } = this.state;
    const sortedData = this.getSortedData();


    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>


          <Dropdown icon='date_range'
          source={this.Class} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handleclass}
          value={this.state.classvalue} label='Standard' required
        />
        <Dropdown icon='label'
          source={this.section} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handlesection}
          value={this.state.sectionvalue} label='Section' required
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
            <TableCell >{item.class}</TableCell>
            <TableCell >{item.section}</TableCell>
            </TableRow>
        ))}

      </Table>
      <Dropdown icon='label'
          source={this.cycle} // to be pulled from class database ( no. of classes of that school)
          onChange={this.handlecycle}
          value={this.state.cyclevalue} label='Fee Cycle' required
        />
      <Input type='no' label='Total Annual Fee' name='total-fee' icon='attach_money' value={this.state.total_fee} onChange={this.handleChange.bind(this, 'total_fee')} />
       <Card><Button  label='Assign' onClick={this.assignFee} accent raised/></Card>

      </div>
    );
  }
}

export default feeassign;
