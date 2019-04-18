import React, { Component } from 'react';
import {FormControl,InputLabel,Select,MenuItem} from '@material-ui/core';

export default class List extends Component {
    constructor(props){
        super(props)
        this.state = {
            valueList:'',
            list:[],
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.list != this.state.list) this.setState({list:nextProps.list})
    }

    handleChange = (event) => {
        this.setState({valueList: event.target.value });
        let selectionned = null
        if(event.target.value>0) selectionned = this.state.list[event.target.value].value
        this.props.changeHandler(selectionned)
    };

    render() {
        let { list } = this.state
        let { listName } = this.props
        return (
            <FormControl>
                <InputLabel htmlFor="listName">{listName}</InputLabel>
                <Select
                    value={this.state.valueList}
                    onChange={this.handleChange}
                    inputProps={{
                    name: 'listName',
                    id: 'listName',
                    }}
                >
                    <MenuItem value={-1}><em>Vide</em></MenuItem>
                    {list.map(({key,value}) => (
                        <MenuItem value={key}>{value}</MenuItem>
                    ))}
                </Select>
            </FormControl>
          );
    }
  }
