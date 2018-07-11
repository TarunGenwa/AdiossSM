import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import Authorization from '../Authorizations/Auth';
import App from './App';
import store from '../store';
import Inputform from './Inputform';
import React from 'react';
import Table from './Table';
import Profile from './student_module/profile';
import Attendance from './student_module/attendance';
import Addexam from './Acads_module/Addexam';
import Addsubject from './Acads_module/Addsubject';
import Feeassign from './finance_module/Feeassign';
import Feepay from './finance_module/Feepay';
import Employeeform from './employee_module/employee_form';
import Entermarks from './Acads_module/entermarks2';
import Employeepayroll from './finance_module/employee_payroll';
import Financeinfo from './finance_module/financeinfo';
import EmployeePaymentDetails from './employee_module/employee_payment_details';
import FindStudents from './student_module/find_student';
import Readmission from './Readmission';
import SessionManager from './SessionManager';
import OldProfile from './backup/profileOld';
import accessOldData from './backup/accessOldData';
import MSPrint from './MarksSheetprint';
import EmployeeSalaryUpdater from './employee_module/EmployeeSalaryUpdater';
import EmployeeAttendance from './employee_module/Employee_attendance';
import FacultyDetails from './Acads_module/facultyDetails';
import gradeList from './gradeList'
import EditProfile from './Editprofile'
import DataRep from './DatabaseReplication'
import ManageUsers from './Usergenerator';
import CC from './ccprint'
import Activity from './student_module/activity'
const Admin = Authorization(['admin']);
const Accountant = Authorization(['accountant','admin'])
const Teacher = Authorization(['teacher','admin','accountant']);
import tc from './tcprint'
import TCPrint from './TCprint.js'

//accountant(tc,fees,payment)+teacher/teacher/ldc(tc,fees,payment)

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={App} store={store}>
    <Route path='/Inputform' component={Accountant(Inputform)}/>
    <Route path='/Table' component={Accountant(Table)}/>
    <Route path='/Profile' component={Teacher(Profile)}/>
    <Route path='/Attendance' component={Teacher(Attendance)}/>
    <Route path='/Addexam' component={Teacher(Addexam)}/>
    <Route path='/Addsubject' component={Teacher(Addsubject)}/>
    <Route path='/Feeassign' component={Accountant(Feeassign)}/>
    <Route path='/Feepay' component={Accountant(Feepay)}/>
    <Route path='/Employeeform' component={Accountant(Employeeform)}/>
    <Route path='/Entermarks' component={Teacher(Entermarks)}/>
    <Route path='/Employeepayroll' component={Accountant(Employeepayroll)}/>
    <Route path='/Financeinfo' component={Accountant(Financeinfo)}/>
    <Route path='/EmployeePaymentDetails' component={Accountant(EmployeePaymentDetails)}/>
    <Route path='/FindStudents' component={Teacher(FindStudents)}/>
    <Route path='/Readmission' component={Admin(Readmission)}/>
    <Route path='/SessionManager' component={Admin(SessionManager)}/>
    <Route path='/MSPrint' component={Accountant(MSPrint)}/>
    <Route path='/OldProfile' component={Teacher(OldProfile)}/>
    <Route path='/AccessOldData' component={Teacher(accessOldData)}/>
    <Route path='/FacultyDetails' component={Accountant(FacultyDetails)}/>
    <Route path='/EmployeeAttendance' component={Accountant(EmployeeAttendance)}/>
    <Route path='/EmployeeSalaryUpdater' component={Accountant(EmployeeSalaryUpdater)}/>
    <Route path='/ManageUsers' component={Admin(ManageUsers)}/>
    <Route path='/gradeList' component={Accountant(gradeList)}/>
    <Route path='/backup' component={Admin(DataRep)}/>
    <Route path='/CC' component={Admin(CC)}/>
    <Route path='/EditProfile' component={Admin(EditProfile)}/>
    <Route path='/Activity' component={Admin(Activity)}/>
    <Route path='/tc' component={Admin(tc)}/>
    <Route path='/TCPrint' component={Admin(TCPrint)}/>
  </Route>
</Router>
)
export default routes
