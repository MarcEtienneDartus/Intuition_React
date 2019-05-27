import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {Input,InputLabel,FormControl,Paper,Typography,Button} from '@material-ui/core';
import AuthController from '../../component/AuthController/AuthController';

import './SignIn.css';

export default class SignIn extends Component {
    constructor(props){
        super(props)
        AuthController.CheckAuth(this.props);
        this.email = ''
        this.password =''
    }

    handleConnection = () =>{
        const url = process.env.REACT_APP_API_URL+'api/auth/login';
        // const url = 'http://api.swizzl.fr/api/auth/login';
        let fetchData = { 
            method: 'POST', 
            body:'email='+this.email+'&password='+this.password,
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        }
        fetch(url, fetchData)
        .then( async (resp) => {
            const cookies = new Cookies();
            console.log(resp)
            if (resp.ok) {
                const jsonData = await resp.json();
                console.log(jsonData)
                let now = new Date()
                let time = new Date(now.getTime()+2419200000)
                cookies.set('auth', jsonData.auth, { path: '/', expires: time});
                cookies.set('token', jsonData.token, { path: '/', expires: time });
                this.props.history.push('/dashboard')
            } else {
                cookies.remove('auth');
                cookies.remove('token');
                console.error('server response : ' + resp.status);
            }
        });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col style={{marginTop: '30vh'}} lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }} xs={12}>
                        <Paper className='paper'>
                            <Typography className='title' component="h1" variant="h5">Intuition</Typography>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus onChange={text => {this.email=text.target.value}}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" onChange={text => {this.password=text.target.value}} />
                            </FormControl>
                            <div className='button'>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleConnection}
                                >
                                    Connexion
                                </Button>
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </Container>
          );
    }
  }
