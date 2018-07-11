import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const ipc = require('electron').ipcRenderer;
const PouchDB = require('pouchdb-browser');
const student_database_one= new PouchDB('student_database_one');
PouchDB.plugin(require('pouchdb-find'));
 var temp
ipc.on('cci',(e,args)=>{
  temp=args
  student_database_one.find({selector:{_id:{$eq:args.enrollid}}
  })
    ReactDOM.render(
<CCpdf id={args.enrollid} /> , document.getElementById('cc'))
})

class CCpdf extends Component{
  constructor(props){
    super(props);
    this.state=temp
    };

render(){
return(
  <div>
     <img src="../../src/assets/mslogo.jpg" style={{width:'100%'}}/>
     <p>
       प्रमाणित किया जाता है की {this.state.name} आत्मज श्री {this.state.father_name}
     </p>
     <p>
       छात्र रजिस्टर संख्या {this.state.reg_no} जिसकी जन्म तिथि (अंकों में) {this.state.dob1} (शब्दों में)
    </p>
    <p>
      {this.state.dob2} है| दिनांक {this.state.startdate} से {this.state.enddate} की अवधि में न्यू मोंटेसरी
    </p>
    <p>
      पब्लिक सीनियर सेकेंडरी स्कूल के छात्र रहे है| इस अवधि में इनका कार्य एवं चरित्र {this.state.type} रहा है
    </p>
    <p>
      और इन्होंने अपनी परीक्षा सन {this.state.year} में उत्तीर्ण की है|
    </p>

    <p>
        जहाँ तक मेरी जानकारी है इनका नैतिक चरित्र श्रेष्ठ है| इन्होंने विद्यालय में निम्न गतिविधयों में भाग लिया है :
    </p>
    <p>
      मे इनके जीवन में सफलता की कामना करता हु|
    </p>

</div>
)}
};
