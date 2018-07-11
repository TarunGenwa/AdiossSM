import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Input from 'react-toolbox/lib/input';
import PouchDB from 'pouchdb-browser' ;
import DatePicker from 'react-toolbox/lib/date_picker';
import {Button} from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import {feepay_database} from '../App'
var enroll_id='';
var paid_value=0;

class Feepay extends Component {

  constructor(props) {
    super(props);

      this.state = {
          student_name:'',
          total_fee:'',
          paid_before:'',
          class_section:'',
          fee_cycle:'',
          paid_today:'',
          checkbox:true,
          enrollid:'',
          last_payment_date:'',
          last_amount_paid:''
          };
          this.baseState = this.state ;

      }

Class = [
    { value: 1, label: '1st' },
    { value: 2, label: '2nd'},
    { value: 3, label: '3rd' },
    { value: 4, label: '1st' },
    { value: 5, label: '2nd'},
    { value: 6, label: '3rd' },
    { value: 7, label: '1st' },
    { value: 8, label: '2nd'},
    { value: 9, label: '3rd' },
    { value: 10, label: '1st' },
    { value: 11, label: '2nd'},
    { value: 12, label: '3rd' }
  ];
  section = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B'},
    { value: 'C', label: 'C' }
  ];
  cycle = [
    { value: '1', label: 'Monthly' },
    { value: '2', label: 'Quaterly'},
    { value: '3', label: 'Semi-Annual' },
    { value: '4', label: 'Annual' }
  ];
  handleChange = (name, value) => {
    enroll_id=value;

    console.log(this.state.enrollid);
    this.setState({...this.state, [name]: value});

  };

  findID=()=>{

    //console.log('in the findID function');
    //console.log(this.state.enrollid);
    feepay_database.find({
     selector: {_id :this.state.enrollid }
   }).then((result)=>{
       console.log(result);
       console.log(result.docs[0].name);
       this.setState({...this.state,
       student_name:result.docs[0].name,
       class_section:result.docs[0].class+result.docs[0].section,
       total_fee:result.docs[0].totalFee,
       fee_cycle:result.docs[0].feeCycle,
       paid_before:result.docs[0].totalFeePaid,
       last_amount_paid:result.docs[0].dateOfPayment.feepaid,
       last_payment_date:result.docs[0].dateOfPayment._id
     });

   }).catch(function (err) {
     console.log(err);
   });

  }

  handleChangeFee = (name, value) => {
    paid_value=value;
    console.log(value);
    this.setState({...this.state, [name]: value});
  };

  handleCheckboxChange = () => {
    this.setState({checkbox: !this.state.checkbox});
  };

submit=()=>{
    if(paid_value===0){
      alert('please enter the amount deposited today');
    }
    else{
      console.log('paid value iss')
      console.log(paid_value)
      feepay_database.get(enroll_id).then(function(doc) {
        console.log(doc.name);
            return feepay_database.put({
            _id:doc._id,
            _rev: doc._rev,
            name:doc.name,
            class:doc.class,
            section:doc.section,
            totalFee:doc.totalFee,
            feeCycle:doc.feeCycle,
            totalFeePaid:parseInt(paid_value)+parseInt(doc.totalFeePaid),
            dateOfPayment:{_id: new Date().toISOString(), feepaid:parseInt(paid_value)}

          }).then(function(response) {
            // handle response
          }).catch(function (err) {
            console.log(err);
          });
      })
  }
  this.setState(this.baseState);
};

  render () {

      /*
          id provided through props
        */

    return (
      <div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
      <Card>
        <Input type='no' label='Enrollment ID' name='enrollid' icon='account_box' value={this.state.enrollid} onChange={this.handleChange.bind(this, 'enrollid')} />
        <Button  icon='done' label= 'Search'  onClick={this.findID.bind(this)} accent raised/>
        <ListItem caption='Student' legend={this.state.student_name} leftIcon='child_care' />
        <ListItem caption='Class(Section)' legend={this.state.class_section} leftIcon='class' />
        <ListItem caption='Fee Cycle' legend={this.state.fee_cycle} leftIcon='cached' />
        <ListItem caption='Total Fee' legend={this.state.total_fee} leftIcon='attach_money' />
        <ListItem caption='Paid Before' legend={this.state.paid_before} leftIcon='money_off' />
        <ListItem caption='Last Payment Date' legend={this.state.last_payment_date} leftIcon='attach_money' />
        <ListItem caption='Last Amount Payment' legend={this.state.last_amount_paid} leftIcon='money_off' />
        <Input type='no' label='Paid Today' name='paid_today' icon='attach_money' value={this.state.paid_today} onChange={this.handleChangeFee.bind(this, 'paid_today')} />
        <ListCheckbox
          caption='Print Reciept'
          checked={this.state.checkbox}

          onChange={this.handleCheckboxChange}
        />

      <Button  icon='done' label='Submit Fee' onClick={this.submit} accent raised/>
      </Card>
      </div>
    );
  }
}

export default Feepay;
