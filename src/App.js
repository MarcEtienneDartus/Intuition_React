import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import SignIn from './view/SignIn/SignIn';
import Dashboard from './view/Dashboard/Dashboard';
import Default from './view/Default/Default';
import DataViewer from './view/DataViewer/DataViewer'
import './App.css';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/data" component={DataViewer} />
          <Route component={Default}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
