import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ReactDOM from 'react-dom';
import Authorization from '../Authorizations/Auth';
import App from './App';
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
import TCPrint from './TCprint';
import EmployeeSalaryUpdater from './employee_module/EmployeeSalaryUpdater';
import EmployeeAttendance from './employee_module/Employee_attendance';
import FacultyDetails from './Acads_module/facultyDetails';
import gradeList from './gradeList'
import EditProfile from './Editprofile'
import DataRep from './DatabaseReplication'
import ManageUsers from './Usergenerator';
const Admin = Authorization(['admin']);
const Academic = Authorization(['Academic-Module','admin'])
const Finance = Authorization(['Finance-Module','admin']);
const Student = Authorization(['Student-Module','admin']);
const Employee = Authorization(['Employee-Module','admin']);

const routes = (
  <Router history={hashHistory}>

    <Route path='/' component={App}>
    <Route path='/Inputform' component={Student(Inputform)}/>
    <Route path='/Table' component={Admin(Table)}/>
    <Route path='/Profile' component={Student(Profile)}/>
    <Route path='/Attendance' component={Student(Attendance)}/>
    <Route path='/Addexam' component={Academic(Addexam)}/>
    <Route path='/Addsubject' component={Academic(Addsubject)}/>
    <Route path='/Feeassign' component={Finance(Feeassign)}/>
    <Route path='/Feepay' component={Finance(Feepay)}/>
    <Route path='/Employeeform' component={Employee(Employeeform)}/>
    <Route path='/Entermarks' component={Academic(Entermarks)}/>
    <Route path='/Employeepayroll' component={Finance(Employeepayroll)}/>
    <Route path='/Financeinfo' component={Finance(Financeinfo)}/>
    <Route path='/EmployeePaymentDetails' component={Employee(EmployeePaymentDetails)}/>
    <Route path='/FindStudents' component={Student(FindStudents)}/>
    <Route path='/Readmission' component={Admin(Readmission)}/>
    <Route path='/SessionManager' component={Admin(SessionManager)}/>
    <Route path='/TCPrint' component={Admin(TCPrint)}/>
    <Route path='/OldProfile' component={Admin(OldProfile)}/>
    <Route path='/AccessOldData' component={Admin(accessOldData)}/>
    <Route path='/FacultyDetails' component={Admin(FacultyDetails)}/>
    <Route path='/EmployeeAttendance' component={Admin(EmployeeAttendance)}/>
    <Route path='/EmployeeSalaryUpdater' component={Admin(EmployeeSalaryUpdater)}/>
    <Route path='/ManageUsers' component={Admin(ManageUsers)}/>
    <Route path='/gradeList' component={Admin(gradeList)}/>
    <Route path='/backup' component={Admin(DataRep)}/>
    <Route path='/EditProfile' component={Admin(EditProfile)}/>
  </Route>
</Router>
)
export default routes
