import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const ipc = require('electron').ipcRenderer;
const PouchDB = require('pouchdb-browser');
const student_database_one= new PouchDB('student_database_one');
PouchDB.plugin(require('pouchdb-find'));

ipc.on('tci',(e,args)=>{
  console.log(args);

    ReactDOM.render(
<TCpdf id={args.enrollid} /> , document.getElementById('tc'))
})

class TCpdf extends Component{
  constructor(props){
    super(props);
    this.state={
      creg:'564',preg:'456',
    }
    };

render(){
  return(<div>
    <table width={843}>
             <tbody>
               <tr>
                 <td colSpan={10} width={843}><img src="../../src/assets/logo.png" style={{width:'100%'}}/></td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>छात्र रजिस्टर संख्या</p>
                 </td>
                 <td width={79}>
                   <p>{this.state.creg}</p>
                 </td>
                 <td colSpan={4} width={324}>
                   <p>लेख प्रमाण (अ)</p>
                 </td>
                 <td colSpan={2} width={158}>
                   <p>प्रवेश रजिस्टर संख्या</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>प्रवेश दिनांक</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={3} width={245}>
                   <p>स्कूल छोड़ने की दिनांक</p>
                 </td>
                 <td colSpan={4} width={361}>
                   <p>स्कूल छोड़ने का कारण</p>
                 </td></tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={3} width={245}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={4} width={361}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={6} width={500}>
               <p>लेख प्रमाण (ब) </p>
                 </td>
                 <td width={79}>
                   <p>आधार नंबर</p>
                 </td>
                 <td colSpan={3} width={282}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>छात्र का नाम</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>पिता का नाम</p>
                 </td>
                 <td colSpan={2} rowSpan={2} width={158}>
                   <p>विवाह की दिनांक यदि विवाह हो गया हो</p>
                 </td>
                 <td colSpan={2} rowSpan={4} width={158}>
                   <p>इस स्कूल में प्रवेश होने से पहले उस स्कूल का नाम जिसमे छात्र पढता था</p>
                 </td>
                 <td colSpan={2} rowSpan={4} width={203}>
                   <p>पिछले स्कूल को छोड़ते समय कोंसी कक्षा में उत्तीर्ण हुआ था</p>
                   <p>किस कक्षा में बढ़ाये जाने योग्य था</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} rowSpan={2} width={158}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} rowSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>माता का नाम</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>संरक्षाक का नाम</p>
                 </td>
                 <td colSpan={2} width={158}>
                   <p>धर्म</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={158}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} rowSpan={3} width={158}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} rowSpan={3} width={203}>
                   <p>&nbsp;</p>
                 </td></tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>व्यवसाय</p>
                 </td>
                 <td colSpan={4} width={324}>
                   <p>छात्र का वर्तमान पता</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={4} width={324}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>जन्मतिथि (अंकों में)</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>(शब्दों में)</p>
                 </td>
                 <td colSpan={5} width={440}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={6} width={500}>
                   <p>लेख प्रमाण (स)</p>
                 </td>
                 <td colSpan={4} width={361}>
                   <p>लेख प्रमाण (द) </p>
                 </td>
               </tr>
               <tr>
                 <td colSpan={2} width={158}>
                   <p>प्रवेश या उत्तीर्ण</p>
                 </td>
                 <td colSpan={2} rowSpan={3} width={166}>
                   <p>इस स्कूल में कक्षा पास करने की दिनांक</p>
                 </td>
                 <td colSpan={2} width={158}>
                   <p>उपस्तिथि</p>
                 </td>
                 <td colSpan={2} width={158}>
                   <p>कक्षा में स्थान</p>
                 </td>
                 <td rowSpan={3} width={79}>
                   <p>विषय जो लिए गये है</p>
                 </td>
                 <td rowSpan={2} width={123}>
                   <p>स्कूल वर्ष में आचरण तथा कार्य</p>
                 </td>
               </tr>
               <tr>
                 <td rowSpan={2} width={79}>
                   <p>कक्षा</p>
                 </td>
                 <td rowSpan={2} width={79}>
                   <p>दिनांक</p>
                 </td>
                 <td rowSpan={2} width={79}>
                   <p>स्कूल मीटिंग की संख्या</p>
                 </td>
                 <td rowSpan={2} width={79}>
                   <p>उपस्तिथ रहने की मीटिंग संख्या</p>
                 </td>
                 <td rowSpan={2} width={79}>
                   <p>कक्षा में छात्रों की संख्या</p>
                 </td>
                 <td rowSpan={2} width={79}>
                   <p>कक्षा में अन्तिम परीक्षा के अनुस्वार स्थान</p>
                 </td>
               </tr>
               <tr>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>1</p>
                 </td>
                 <td width={79}>
                   <p>2</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>3</p>
                 </td>
                 <td width={79}>
                   <p>4</p>
                 </td>
                 <td width={79}>
                   <p>5</p>
                 </td>
                 <td width={79}>
                   <p>6</p>
                 </td>
                 <td width={79}>
                   <p>7</p>
                 </td>
                 <td width={79}>
                   <p>8</p>
                 </td>
                 <td width={123}>
                   <p>9</p>
                 </td></tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>&nbsp;</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td colSpan={2} width={166}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={79}>
                   <p>&nbsp;</p>
                 </td>
                 <td width={123}>
                   <p>संस्था प्रधान के अद्योहस्ताक्षर</p>
                 </td>
               </tr>
               <tr>
                 <td width={79}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={86}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={79}>&nbsp;</td>
                 <td width={123}>&nbsp;</td>
               </tr>
             </tbody>
           </table>
           <p>प्रमाणित किया जाता है की उपरोक्त छात्र रजिस्टर की सिक्षा विभाग के
              नियमानुसार विद्यार्थी के स्कूल छोड़ने के दिन तक सम्पूर्ण प्रविस्टिया पूर्ण कर दी गयी है</p>
           <p>और प्रमाणित किया जाता है कि स्कूल शिक्षण शुल्क विद्यार्थी की तरफ से बकाया नहीं है|
             प्रतिलिपि दी गयी/डाक द्वारा भेजी गयी </p>
           <p style={{textAlign:'right'}}>संस्था प्रधान के हस्ताक्षर</p>
  </div>)
}
}
