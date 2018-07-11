import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const ipc = require('electron').ipcRenderer;
const PouchDB = require('pouchdb-browser');
PouchDB.plugin(require('pouchdb-find'));
var student_database_one=new PouchDB('student_database_one')
var Obj
var subjectarray=[];
var temp=[]
var totPass=0

console.log('int this dunc');
ipc.on('msi',(e,args)=>{
  console.log(args);
  temp=args[0]
  subjectarray=[]
  subjectarray=args.slice(1,args.length)
  for(var i=0;i<subjectarray.length;i++){
    totPass=subjectarray.annualtotal+totPass
  }
  totPass=totPass/subjectarray.length
  if(totPass>=32){
    temp.res='Pass'
    temp.nxtclass=temp.class+1
    if(temp.nxtclass>12){
      temp.nxtclass='You Completed your H.S'
    }
  }
  else {
    temp.res='Fail'
    temp.nxtclass=temp.class
  }

    ReactDOM.render(
<MSpdf id={args.enrollid} /> , document.getElementById('ms'))
})



class MSpdf extends Component{
  constructor(props){
    super(props);
    this.state=temp
    };

    render(){

//total marks object is also required



return(
  <div>
       <table width={866}>
         <tbody>
           <tr>
             <td colSpan={11} width={866}><img src="../../src/assets/mslogo.jpg" style={{width:'100%'}}/></td>
           </tr>
           <tr>
             <td colSpan={2} width={200}>
               <p style={{}}>S.R. No.</p>
             </td>
             <td width={69}>
               <p style={{}}>{this.state.enrollid}</p>
             </td>
             <td colSpan={4} rowSpan={2} width={248}>
               <p>SESSION :{this.state.session}</p>
             </td>
             <td colSpan={3} width={208}>
               <p>CLASS</p>
             </td>
             <td width={141}>
               <p>{this.state.class}</p>
             </td>
           </tr>
           <tr>
             <td colSpan={2} width={200}>
               <p>CLASS ROLL NO.</p>
             </td>
             <td width={69}>
               <p>{this.state.classrollno}</p>
             </td>
             <td colSpan={3} width={208}>
               <p>DATE OF BIRTH</p>
             </td>
             <td width={141}>
               <p>{this.state.DOB}</p>
             </td>
           </tr>
           <tr>
             <td colSpan={3} width={269}>
               <p>NAME OF THE STUDENT</p>
             </td>
             <td colSpan={8} width={597}>
               <p>{this.state.name}</p>
             </td>
           </tr>
           <tr>
             <td colSpan={3} width={269}>
               <p>FATHER'S NAME</p>
             </td>
             <td colSpan={8} width={597}>
               <p>{this.state.father_name} </p>
             </td>
           </tr>
           <tr>
             <td colSpan={3} width={269}>
               <p>MOTHER'S NAME</p>
             </td>
             <td colSpan={8} width={597}>
               <p>{this.state.Mother_name}</p>
             </td>
           </tr>
           <tr>
             <td colSpan={3} width={269}>
               <p>ADDRESS</p>
             </td>
             <td colSpan={8} width={597}>
               <p>{this.state.Address}</p>
             </td>
           </tr>

           <tr>
             <td rowSpan={2} width={126}>
               <p>Subject</p>
             </td>
             <td rowSpan={2} width={74}>
               <p>Unit Test-I</p>
             </td>
             <td rowSpan={2} width={69}>
               <p>Unit Test-II</p>
             </td>
             <td colSpan={2} width={119}>
               <p>Half Yearly</p>
             </td>
             <td rowSpan={2} width={61}>
               <p>TOTAL</p>
             </td>
             <td rowSpan={2} width={69}>
               <p>Unit Test-III</p>
             </td>
             <td colSpan={2} width={112}>
               <p>Annual Exam</p>
             </td>
             <td rowSpan={2} width={95}>
               <p>TOTAL</p>
             </td>
             <td rowSpan={2} width={141}>
               <p>Grand Total</p>
             </td>
           </tr>
           <tr>
             <td width={62}>
               <p>Oral</p>
             </td>
             <td width={57}>
               <p>Written</p>
             </td>
             <td width={56}>
               <p>Oral</p>
             </td>
             <td width={57}>
               <p>Written</p>
             </td>
           </tr>
        {subjectarray.map((item,idx)=>  (
          <tr key={idx}>
               <td width={126}>
                 <p>{item.subname}</p>
               </td>
               <td width={74}>
                 <p>{item.ut1}</p>
               </td>
               <td width={69}>
                 <p>{item.ut2}</p>
               </td>
               <td width={62}>
                 <p>{item.hyoral}</p>
               </td>
               <td width={57}>
                 <p>{item.hywritten}</p>
               </td>
               <td width={61}>
                 <p>{item.hytotal}</p>
               </td>
               <td width={69}>
                 <p>{item.ut3}</p>
               </td>
               <td width={56}>
                 <p>{item.annualoral}</p>
               </td>
               <td width={57}>
                 <p>{item.annualwritten}</p>
               </td>
               <td width={95}>
                 <p>{item.annualtotal}</p>
               </td>
               <td width={141}>
                 <p>{item.grandtotal}</p>
               </td>
             </tr>
      ))}

           <tr>
             <td width={126}>
               <p>Percent %</p>
             </td>
             <td width={74}>
               <p>{this.state.ut1p}</p>
             </td>
             <td width={69}>
               <p>{this.state.ut2p}</p>
             </td>
             <td colSpan={3} width={179}>
               <p>{this.state.hyp}</p>
             </td>
             <td width={69}>
               <p>{this.state.ut3p}</p>
             </td>
             <td colSpan={3} width={208}>
               <p>{this.state.annp}</p>
             </td>
             <td width={141}>
               <p>{this.state.gtp}</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Attendance</p>
             </td>
             <td width={74}>
               <p>{this.state.ut1a}</p>
             </td>
             <td width={69}>
               <p>{this.state.ut2a}</p>
             </td>
             <td colSpan={3} width={179}>
               <p>{this.state.hya}</p>
             </td>
             <td width={69}>
               <p>{this.state.ut3a}</p>
             </td>
             <td colSpan={3} width={208}>
               <p>{this.state.anna}</p>
             </td>
             <td width={141}>
               <p>{this.state.gta}</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Total Attendance</p>
             </td>
             <td width={74}>
               <p>{this.state.ut1ta}</p>
             </td>
             <td width={69}>
               <p>{this.state.ut2ta}</p>
             </td>
             <td colSpan={3} width={179}>
               <p>{this.state.hyta}</p>
             </td>
             <td width={69}>
               <p>{this.state.ut3ta}</p>
             </td>
             <td colSpan={3} width={208}>
               <p>{this.state.annta}</p>
             </td>
             <td width={141}>
               <p>{this.state.gtta}</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Teacher's Sign.</p>
             </td>
             <td width={74}>
               <p>&nbsp;</p>
             </td>
             <td width={69}>
               <p>&nbsp;</p>
             </td>
             <td width={62}>
               <p>&nbsp;</p>
             </td>
             <td width={57}>
               <p>&nbsp;</p>
             </td>
             <td width={61}>
               <p>&nbsp;</p>
             </td>
             <td width={69}>
               <p>&nbsp;</p>
             </td>
             <td width={56}>
               <p>&nbsp;</p>
             </td>
             <td width={57}>
               <p>&nbsp;</p>
             </td>
             <td width={95}>
               <p>&nbsp;</p>
             </td>
             <td width={141}>
               <p>&nbsp;</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Principal's Sign.</p>
             </td>
             <td width={74}>
               <p>&nbsp;</p>
             </td>
             <td width={69}>
               <p>&nbsp;</p>
             </td>
             <td width={62}>
               <p>&nbsp;</p>
             </td>
             <td width={57}>
               <p>&nbsp;</p>
             </td>
             <td width={61}>
               <p>&nbsp;</p>
             </td>
             <td width={69}>
               <p>&nbsp;</p>
             </td>
             <td width={56}>
               <p>&nbsp;</p>
             </td>
             <td width={57}>
               <p>&nbsp;</p>
             </td>
             <td width={95}>
               <p>&nbsp;</p>
             </td>
             <td width={141}>
               <p>&nbsp;</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Parent's Sing.</p>
             </td>
             <td width={74}>
               <p>&nbsp;</p>
             </td>
             <td width={69}>
               <p>&nbsp;</p>
             </td>
             <td width={62}>
               <p>&nbsp;</p>
             </td>
             <td width={57}>
               <p>&nbsp;</p>
             </td>
             <td width={61}>
               <p>&nbsp;</p>
             </td>
             <td width={69}>
               <p>&nbsp;</p>
             </td>
             <td width={56}>
               <p>&nbsp;</p>
             </td>
             <td width={57}>
               <p>&nbsp;</p>
             </td>
             <td width={95}>
               <p>&nbsp;</p>
             </td>
             <td width={141}>
               <p>&nbsp;</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>OTHER ACTIVITIES</p>
             </td>
             <td width={74}>
               <p>Term</p>
               <p>Test-I</p>
             </td>
             <td width={69}>
               <p>Term</p>
               <p>Test-II</p>
             </td>
             <td width={62}>
               <p>Term</p>
               <p>Test-III</p>
             </td>
             <td colSpan={7} width={535}>
               <p>REMARKS</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Punctuality</p>
             </td>
             <td width={74}>
               <p>{this.state.punc1}</p>
             </td>
             <td width={69}>
               <p>{this.state.punc2}</p>
             </td>
             <td width={62}>
               <p>{this.state.punc3}</p>
             </td>
             <td colSpan={2} width={117}>
               <p>I TERM</p>
             </td>
             <td colSpan={5} width={418}>
               <p>&nbsp;</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Good Habits</p>
             </td>
             <td width={74}>
               <p>{this.state.gh1}</p>
             </td>
             <td width={69}>
               <p>{this.state.gh2}</p>
             </td>
             <td width={62}>
               <p>{this.state.gh3}</p>
             </td>
             <td colSpan={2} width={117}>
               <p>II TERM</p>
             </td>
             <td colSpan={5} width={418}>
               <p>&nbsp;</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Moral Values</p>
             </td>
             <td width={74}>
               <p>{this.state.mv1}</p>
             </td>
             <td width={69}>
               <p>{this.state.mv2}</p>
             </td>
             <td width={62}>
               <p>{this.state.mv3}</p>
             </td>
             <td colSpan={2} width={117}>
               <p>III TERM</p>
             </td>
             <td colSpan={5} width={418}>
               <p>&nbsp;</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Manners</p>
             </td>
             <td width={74}>
               <p>{this.state.manner1}</p>
             </td>
             <td width={69}>
               <p>{this.state.manner2}</p>
             </td>
             <td width={62}>
               <p>{this.state.manner3}</p>
             </td>
             <td colSpan={4} width={242}>
               <p>Final Result</p>
             </td>
             <td colSpan={3} width={293}>
               <p>{this.state.res}</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Drawing</p>
             </td>
             <td width={74}>
               <p>{this.state.draw1}</p>
             </td>
             <td width={69}>
               <p>{this.state.draw2}</p>
             </td>
             <td width={62}>
               <p>{this.state.draw3}</p>
             </td>
             <td colSpan={4} width={242}>
               <p>Passed &amp; Promoted to Class</p>
             </td>
             <td colSpan={3} width={293}>
               <p>{this.state.nxtclass}</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Art &amp; Craft</p>
             </td>
             <td width={74}>
               <p>{this.state.anc1}</p>
             </td>
             <td width={69}>
               <p>{this.state.anc2}</p>
             </td>
             <td width={62}>
               <p>{this.state.anc3}</p>
             </td>
             <td colSpan={4} width={242}>
               <p>Rank in Class</p>
             </td>
             <td colSpan={3} width={293}>
               <p>{this.state.classrank}</p>
             </td>
           </tr>
           <tr>
             <td width={126}>
               <p>Music</p>
             </td>
             <td width={74}>
               <p>{this.state.music1}</p>
             </td>
             <td width={69}>
               <p>{this.state.music2}</p>
             </td>
             <td width={62}>
               <p>{this.state.music3}</p>
             </td>
             <td colSpan={4} width={242}>
               <p>School Re-open On</p>
             </td>
             <td colSpan={3} width={293}>
               <p>{this.state.startdate}</p>
             </td>
           </tr>
           <tr>
             <td colSpan={5} width={866}>
               <p>Result Declared on {this.state.currentdate}</p>
             </td>
             <td colSpan={6} width={866}>
               <p style={{textAlign:'center'}}>
                 Principal Signature:
               </p>
             </td>

           </tr>
           <tr>
             <td width={126}>
               <p>GRADE SYSTEM:-</p>
             </td>
             <td colSpan={2} width={143}>
               <p>100% To 86% - "A"</p>
             </td>
             <td colSpan={2} width={119}>
               <p>86% To 71% - "B"</p>
             </td>
             <td colSpan={2} width={130}>
               <p>70% To 51% - "C"</p>
             </td>
             <td colSpan={2} width={112}>
               <p>50% To 31% - "D"</p>
             </td>
             <td colSpan={2} width={236}>
               <p>30% To 0% - "E"</p>
             </td>
           </tr>
           <tr>
             <td colSpan={11} width={866}>
               <p style={{textAlign:'center'}}> "PREPARING STUDENTS FOR SUCCESS IN A CHANGING WORLD"
               </p>       </td>
           </tr>
         </tbody>
       </table>


  </div>
)
}


};
