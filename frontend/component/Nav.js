import React, { Component } from 'react';
import { AppBar, Checkbox, IconButton, Button} from 'react-toolbox';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import Navigation from 'react-toolbox/lib/navigation';
import Input from 'react-toolbox/lib/input';
import {Link} from 'react-toolbox/lib/link';
import { ThemeProvider } from 'react-css-themr';
import theme from './appBar.css'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
class Nav extends React.Component{

      render() {
      return (
          <div>
            <NavDrawer active={true}
              pinned={true} permanentAt='xxxl'
               clipped >
               <Navigation type='vertical'>
                   <List selectable ripple>
      <ListSubHeader caption='Students' /><MenuDivider />

      <a href="#/Inputform"><MenuItem value='download' icon='add' caption='New Addmission' /></a>
      <a href="#/FindStudents"><MenuItem value='download' icon='search' caption='Find Student' /></a>


      <ListSubHeader caption='Academic' /><MenuDivider />
      <a href="#/Addsubject"><MenuItem value='book' icon='book' caption='Manage Subjects' /></a>
      <a href="#/Attendance"><MenuItem value='date_range' icon='date_range' caption='Attendance' /></a>
      <a href="#/Entermarks"><MenuItem value='settings' icon='assignment' caption='Enter Marks' /></a>
      <a href="#/gradeList"><MenuItem value='download' icon='star' caption='Grade Strategy'/></a>

      <ListSubHeader caption='Finance' /><MenuDivider />
      <a href="#/Feeassign"><MenuItem value='download' icon='autorenew' caption='Fee Cycle Management' /></a>
      <a href="#/Feepay"><MenuItem value='help' icon='payment' caption='New Fee Pay' /></a>
      <a href="#/Employeepayroll"><MenuItem value='help' icon='receipt' caption='Employee Payroll' /></a>


      <ListSubHeader caption='Staff' /><MenuDivider />
      <a href="#/Employeeform"><MenuItem value='download' icon='person_add' caption='Add New Staff' /></a>
      <a href="#/EmployeePaymentDetails"><MenuItem value='download' icon='payment' caption='Staff Payments' /></a>
      <a href="#/EmployeeAttendance"><MenuItem value='download' icon='date_range' caption='Staff Attendance' /></a>
      <a href="#/EmployeeSalaryUpdater"><MenuItem value='download' icon='attach_money' caption='Staff Salary' /></a>

      <ListSubHeader caption='Session Management' /><MenuDivider />
      <a href="#/SessionManager"><MenuItem value='download' icon='timeline' caption='New Session' /></a>
      <a href="#/TCPrint"><MenuItem value='download' icon='print' caption='Print Marksheet' /></a>
      <a href="#/CC"><MenuItem value='download' icon='print' caption='Print Character Certificate' /></a>
        <a href="#/tc"><MenuItem value='download' icon='print' caption='Print TC' /></a>

      <a href="#/AccessOldData"><MenuItem value='download' icon='account_box' caption='Access Alumni Profiles' /></a>

      <ListSubHeader caption='Manage App & Databases ' /><MenuDivider />

      <a href="#/ManageUsers"><MenuItem value='download' icon='fingerprint' caption='Manage Users Roles'/></a>
      <a href="#/Backup"><MenuItem value='download' icon='sync' caption='Backup & Sync'/></a>
      </List>
      </Navigation>
          </NavDrawer>
             <Panel>

             <AppBar title="Adioss School Management" theme={theme} fixed>
               <Navigation type='horizontal'>
                 <Link href='#/'  label='Logout' onClick={this.props.click} icon='launch' />
             </Navigation>
             </AppBar>

              </Panel>
            </div>
          );
      }
  }
export default Nav;
