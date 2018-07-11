import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import {Button} from 'react-toolbox/lib/button';
const ipc = require('electron').ipcRenderer;
var marks_entry_database_one_B=new PouchDB('marks_entry_database_one_B');
import PouchDB from 'pouchdb-browser' ;
var student_database_one=new PouchDB('student_database_one')
var activities_entry_database=new PouchDB('activities_entry_database')
var gradeDefinationDatabase=new PouchDB('gradeDefinationDatabase');

var Marksheetitems=[]
var temp
var temp2=[]
var prev_sub=''
var tempcc=[]
var gradeMaster=[]
var marPer
var grad
var grandTot=0


gradeDefinationDatabase.allDocs({"include_docs": true,"ascending": true}).then(function(docs){
  docs.rows.forEach(function(entry){
  gradeMaster.push(entry.doc)
  });
  gradeMaster = gradeMaster.sort(function (a, b) {
        return a.lowerLimit.localeCompare( b.lowerLimit );
    });

});


class TC extends Component{
  constructor(props){
    super(props);
    this.state={enrollid:'',att_unit1:'e.g. 32/40',att_unit2:'e.g. 32/40',att_unit3:'e.g. 32/40',half_yrly:'e.g. 32/40',annual:'e.g. 32/40'}
  };
  printms=()=>{

        student_database_one.find({
         selector: {_id :this.state.enrollid }
       }).then( (result)=> {
        temp= {enrollid:83,name:'Kishan',father_name:'Jagdish',Mother_name:'Suman Devi',Address:'AdarshNagar DIDWANA',
                     class:'',DOB:'', classrollno:"", session:'',
                     ut1p:'',ut2p:'',hyp:'',ut3p:'',annp:'',gtp:'',
                     ut1a:'',ut2a:'',hya:'',ut3a:'',anna:'',gta:'',
                     ut1ta:'',ut2ta:'',hyta:'',ut3ta:'',annta:'',gtta:'',
                     punc1:'',punc2:'',punc3:'',gh1:'',gh2:'',gh3:'',
                     mv1:'',mv2:'',mv3:'',manner1:'',manner2:'',manner3:'',
                     draw1:'',draw2:'',draw3:'', anc1:'',anc2:'',anc3:'',
                     music1:'',music2:'',music3:'C',
                     res:'pass',nxtclass:'2nd',classrank:'23',startdate:'',currentdate:''
        }
        result.docs.forEach((Object)=>{
          console.log(Object);
          temp.enrollid=Object._id
          temp.name=Object.name
          temp.father_name=Object.father_name
          temp.Mother_name=Object.Mother_name
          temp.Address=Object.address_line1+Object.address_line2+Object.address_City+Object.address_State
          temp.class=Object.classvalue
          temp.DOB=Object.date1
          var str=(this.state.att_unit1).split('/')
          console.log(str);
          console.log('lund ka ball hjai chodu');
          temp.ut1p=parseInt(str[0])/parseInt(str[1])*100
          temp.ut1ta=parseInt(str[1])
          temp.ut1a=parseInt(str[0])
          str=(this.state.att_unit3).split('/')
          temp.ut2p=parseInt(str[0])/parseInt(str[1])*100
          temp.ut2ta=parseInt(str[1])
          temp.ut2a=parseInt(str[0])
          str=(this.state.att_unit3).split('/')
          temp.ut3p=parseInt(str[0])/parseInt(str[1])*100
          temp.ut3ta=parseInt(str[1])
          temp.ut3a=parseInt(str[0])
          str=(this.state.half_yrly).split('/')
          temp.hyp=parseInt(str[0])/parseInt(str[1])*100
          temp.hyta=parseInt(str[1])
          temp.hya=parseInt(str[0])
          str=(this.state.annual).split('/')
          temp.annp=parseInt(str[0])/parseInt(str[1])*100
          temp.annta=parseInt(str[1])
          temp.anna=parseInt(str[0])
        });
        Marksheetitems=[]
         Marksheetitems.push(temp)
       }).catch(function (err) {
         console.log(err);
       });

       activities_entry_database.find({
              selector: {enroll :this.state.enrollid }
          }).then(function (result) {
             result.docs.forEach(function(Object){
               if(Object.activity==='Punctuality/ut1'){
                 temp.punc1=Object.marks
               }
               else if(Object.activity==='Punctuality/ut2'){
                 temp.punc2=Object.marks
               }
               else if(Object.activity==='Punctuality/ut3'){
                 temp.punc3=Object.marks
               }
               else if(Object.activity==='Good Habits/ut1'){
                 temp.gh1=Object.marks
               }
               else if(Object.activity==='Good Habits/ut2'){
                 temp.gh2=Object.marks
               }
               else if(Object.activity==='Good Habits/ut3'){
                 temp.gh3=Object.marks
               }
               else if(Object.activity==='Moral Values/ut1'){
                 temp.mv1=Object.marks
               }
               else if(Object.activity==='Moral Values/ut2'){
                 temp.mv2=Object.marks
               }
               else if(Object.activity==='Moral Values/ut3'){
                 temp.mv3=Object.marks
               }
               else if(Object.activity==='Manners/ut1'){
                 temp.manner1=Object.marks
               }
               else if(Object.activity==='Manners/ut2'){
                 temp.manner2=Object.marks
               }
               else if(Object.activity==='Manners/ut3'){
                 temp.manner3=Object.marks
               }
               else if(Object.activity==='Drawing/ut1'){
                 temp.draw1=Object.marks
               }
               else if(Object.activity==='Drawing/ut2'){
                 temp.draw2=Object.marks
               }
               else if(Object.activity==='Drawing/ut3'){
                 temp.draw3=Object.marks
               }
               else if(Object.activity==='Art and Craft/ut1'){
                 temp.anc1=Object.marks
               }
               else if(Object.activity==='Art and Craft/ut2'){
                 temp.anc2=Object.marks
               }
               else if(Object.activity==='Art and Craft/ut3'){
                 temp.anc3=Object.marks
               }
               else if(Object.activity==='Music/ut1'){
                 temp.music1=Object.marks
               }
               else if(Object.activity==='Music/ut2'){
                 temp.music2=Object.marks
               }
               else if(Object.activity==='Music/ut3'){
                 temp.music3=Object.marks
               }

             });

             Marksheetitems=[]
             Marksheetitems.push(temp)
          }).catch(function (err) {
              console.log(err);
          });

    marks_entry_database_one_B.find({
     selector: {enroll :this.state.enrollid }
   }).then(function (result) {
      temp2=result.docs
      console.log(temp2);
      temp2 = temp2.sort(function (a, b) {
            return a.subject.localeCompare( b.subject );
        });
       prev_sub=temp2[0].subject
       temp={subname:'',ut1:'',ut2:'',hyoral:'',hywritten:'',hytotal:'',ut3:'',annualoral:'',annualwritten:'',annualtotal:'',grandtotal:''}
       temp.subname=prev_sub
       console.log((temp2));
        for (var i=0;i<temp2.length;i++){
          console.log(grandTot);
          if(prev_sub===temp2[i].subject){
            if(temp2[i].examName==='Unit Test 1'){
               marPer=temp2[i].marks*100/temp2[i].MaxMarks
               grad=''
               grandTot=marPer*temp2[i].weightage/100 +grandTot
              grad=gradeMaster[0].grade
                for(var j=1;j<gradeMaster.length;j++){
                  if(marPer>gradeMaster[j].lowerLimit){
                    grad=gradeMaster[j].grade
                  }
                }


              temp.ut1=grad
            }
            else if(temp2[i].examName==='Unit Test 2'){
              marPer=temp2[i].marks*100/temp2[i].MaxMarks
              grad=''
             grad=gradeMaster[0].grade
             grandTot=marPer*temp2[i].weightage/100 +grandTot
               for(var j=1;j<gradeMaster.length;j++){
                 if(marPer>gradeMaster[j].lowerLimit){
                   grad=gradeMaster[j].grade
                 }
               }

              temp.ut2=grad
            }
            else if(temp2[i].examName==='Unit Test 3'){
              marPer=temp2[i].marks*100/temp2[i].MaxMarks
              grad=''
             grad=gradeMaster[0].grade
             grandTot=marPer*temp2[i].weightage/100 +grandTot
               for(var j=1;j<gradeMaster.length;j++){
                 if(marPer>gradeMaster[j].lowerLimit){
                   grad=gradeMaster[j].grade
                 }
               }

              temp.ut3=grad
            }
            else if(temp2[i].examName==='Half Yearly/Oral'){
              marPer=temp2[i].marks*100/temp2[i].MaxMarks
              grad=''
             grad=gradeMaster[0].grade
             grandTot=marPer*temp2[i].weightage/100 +grandTot
               for(var j=1;j<gradeMaster.length;j++){
                 if(marPer>gradeMaster[j].lowerLimit){
                   grad=gradeMaster[j].grade
                 }
               }

              temp.hyoral=grad
            }
            else if(temp2[i].examName==='Half Yearly/Written'){
              marPer=temp2[i].marks*100/temp2[i].MaxMarks
              grad=''
              grad=gradeMaster[0].grade
               grandTot=marPer*temp2[i].weightage/100 +grandTot
              for(var j=1;j<gradeMaster.length;j++){
                if(marPer>gradeMaster[j].lowerLimit){
                  grad=gradeMaster[j].grade
                }
              }
              temp.hywritten=grad
            }
            else if(temp2[i].examName==='Annual Yearly/Oral'){
              marPer=temp2[i].marks*100/temp2[i].MaxMarks
              grad=''
             grad=gradeMaster[0].grade
              grandTot=marPer*temp2[i].weightage/100 +grandTot
               for(var j=1;j<gradeMaster.length;j++){
                 if(marPer>gradeMaster[j].lowerLimit){
                   grad=gradeMaster[j].grade
                 }
               }

              temp.annualoral=grad
            }
            else if(temp2[i].examName==='Annual Yearly/Written'){
              marPer=temp2[i].marks*100/temp2[i].MaxMarks
              grad=''
             grad=gradeMaster[0].grade
              grandTot=marPer*temp2[i].weightage/100 +grandTot
               for(var j=1;j<gradeMaster.length;j++){
                 if(marPer>gradeMaster[j].lowerLimit){
                   grad=gradeMaster[j].grade
                 }
               }

              temp.annualwritten=grad
            }
            prev_sub=temp2[i].subject
          }else{
            console.log('else');
            temp.annualtotal=grandTot
            grad=''
             grad=gradeMaster[0].grade
            for(var j=1;j<gradeMaster.length;j++){
              if(grandTot>gradeMaster[j].lowerLimit){
                grad=gradeMaster[j].grade
              }
            }
            temp.grandtotal=grad
            grandTot=0
            Marksheetitems.push(temp)
            console.log(temp);
            temp={subname:'',ut1:'',ut2:'',hyoral:'',hywritten:'',hytotal:'',ut3:'',annualoral:'',annualwritten:'',annualtotal:'',grandtotal:''}
            temp.subname=temp2[i].subject
            console.log(temp2[i].subject);
            console.log(Marksheetitems);
            prev_sub=temp2[i].subject;
            i=i-1
          }
        }
    if(grandTot!==0){
      temp.annualtotal=grandTot
      grad=''
       grad=gradeMaster[0].grade
      for(var j=1;j<gradeMaster.length;j++){
        if(grandTot>gradeMaster[j].lowerLimit){
          grad=gradeMaster[j].grade
        }
      }
      temp.grandtotal=grad
    }
    Marksheetitems.push(temp)
    console.log('lind');
    console.log(Marksheetitems);
     ipc.send('ms',Marksheetitems)

   }).catch(function (err) {
     console.log(err);
   });


  };
handleChange=(value)=>{
  this.setState({enrollid:value})
}

handleChange1=(name,value)=>{
  this.setState({...this.state, [name]: value});
};

  render(){
    return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
		<h2> Days Present / Total Days </h2>
      <Input type='text' label='Enroll ID' name='EnrollID' value={this.state.enrollid} icon='person' onChange={this.handleChange.bind(this)} />
	      <Input type='text' label='Unit Test 1' name='attendance' value={this.state.att_unit1} icon='person' onChange={this.handleChange1.bind(this,'att_unit1')} />
	      <Input type='text' label='Unit Test 2' name='attendance' value={this.state.att_unit2} icon='person' onChange={this.handleChange1.bind(this,'att_unit2')} />
	      <Input type='text' label='Half Yearly' name='attendance' value={this.state.half_yrly} icon='person' onChange={this.handleChange1.bind(this,'half_yrly')} />
	      <Input type='text' label='Unit Test 3' name='attendance' value={this.state.att_unit3} icon='person' onChange={this.handleChange1.bind(this,'att_unit3')} />
	      <Input type='text' label='Yearly' name='attendance' value={this.state.annual} icon='person' onChange={this.handleChange1.bind(this,'annual')} />
      <Button label='Print Marksheet' onClick={this.printms} accent raised/>
    </div>)
  }
}
export default TC
