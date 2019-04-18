import React, { Component } from 'react';
import AuthController from '../../component/AuthController/AuthController';

export default class Default extends Component {
    constructor(props){
        super(props)
        AuthController.CheckAuth(this.props);
    }
    render() {
        return (
            <div></div>
          );
    }
  }
