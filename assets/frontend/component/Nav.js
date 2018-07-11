import React, { Component } from 'react';
import { AppBar, Checkbox, IconButton, Button} from 'react-toolbox';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import Navigation from 'react-toolbox/lib/navigation';
import Input from 'react-toolbox/lib/input';
import {Link} from 'react-toolbox/lib/link';
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
      <a href="#/FindStudents"><MenuItem value='download' icon='add' caption='Find Student' /></a>
      <a href="#/Profile"><MenuItem value='help' icon='face' caption='Student Profile' /></a>

      <ListSubHeader caption='Academic' /><MenuDivider />
      <a href="#/Addsubject"><MenuItem value='help' icon='favorite' caption='Add Subject' /></a>
      <a href="#/Attendance"><MenuItem value='settings' icon='open_in_browser' caption='Attendance' /></a>
      <a href="#/Entermarks"><MenuItem value='settings' icon='open_in_browser' caption='EnterMarks' /></a>


      <ListSubHeader caption='Finance' /><MenuDivider />
      <a href="#/Feeassign"><MenuItem value='download' icon='get_app' caption='Assign Fee' /></a>
      <a href="#/Feepay"><MenuItem value='help' icon='favorite' caption='Add Subject' /></a>
      <a href="#/Employeepayroll"><MenuItem value='help' icon='favorite' caption='Employeepayroll' /></a>


      <ListSubHeader caption='Employee' /><MenuDivider />
      <a href="#/Employeeform"><MenuItem value='download' icon='add' caption='Employee Form' /></a>
      <a href="#/EmployeePaymentDetails"><MenuItem value='download' icon='add' caption='EmployeePaymentDetails' /></a>
      <a href="#/EmployeeAttendance"><MenuItem value='download' icon='add' caption='EmployeeAttendance' /></a>
      <a href="#/EmployeeSalaryUpdater"><MenuItem value='download' icon='add' caption='EmployeeSalaryUpdater' /></a>

      <ListSubHeader caption='SessionManagement' /><MenuDivider />
      <a href="#/Readmission"><MenuItem value='download' icon='add' caption='Readmission' /></a>
      <a href="#/SessionManager"><MenuItem value='download' icon='add' caption='Session Manager' /></a>
      <a href="#/TCPrint"><MenuItem value='download' icon='add' caption='TC Print' /></a>

      <ListSubHeader caption='Backup' /><MenuDivider />
      <a href="#/OldProfile"><MenuItem value='download' icon='add' caption='OldProfile' /></a>
      <a href="#/AccessOldData"><MenuItem value='download' icon='add' caption='AccessOldData' /></a>
      <a href="#/ManageUsers"><MenuItem value='download' icon='add' caption='ManageUsers'/></a>
      <a href="#/gradeList"><MenuItem value='download' icon='add' caption='Enter Grade Strategy'/></a>
<a href="#/Backup"><MenuItem value='download' icon='add' caption='Backup & Sync'/></a>
      </List>
      </Navigation>
          </NavDrawer>
             <Panel>
             <AppBar title="Adioss School Management"  flat fixed>
               <Navigation type='horizontal'>
             </Navigation>
             </AppBar>
              </Panel>
            </div>
          );
      }
  }
export default Nav;
