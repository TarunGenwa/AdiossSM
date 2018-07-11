import React, { Component } from 'react';
var login_details = new PouchDB('login_details');
import PouchDB from 'pouchdb-browser';
PouchDB.plugin(require('pouchdb-find'));


const ipcRenderer = require('electron').ipcRenderer;
const Authorization = (allowedRoles) => (WrappedComponent) =>
  {return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)

      // In this case the user is hardcoded, but it could be loaded from anywhere.
      // Redux, MobX, RxJS, Backbone...
      this.state = {
        user: {
          name: 'tarun',
          role: 'admin'
        }
      }
    }
    render() {
      console.log(this.props)
      const { role } = this.state.user
      if (allowedRoles.includes(role)) {
        return <WrappedComponent {...this.props} />
      } else {
        return (<div style={{ flex: 1, overflowX: 'auto', margin: '5% 10% 10% 20%' }}>
          <h1>No page for you! </h1></div>)
      }
    }
  }}
  export default Authorization
