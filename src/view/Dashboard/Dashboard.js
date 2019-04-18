import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {Paper,Button} from '@material-ui/core';
import AuthController from '../../component/AuthController/AuthController';
import EnhancedTable from '../../component/EnhancedTable/EnhancedTable';
import { withRouter } from 'react-router-dom';
import List from '../../component/List/List';

import './Dashboard.css';

const rows = [
    { id: 'NomSociete', numeric: false, disablePadding: true, label: 'Nom de la Société' },
    { id: 'CA', numeric: false, disablePadding: false, label: 'CA M€' },
    { id: 'Ebitda', numeric: false, disablePadding: false, label: 'Ebitda' },
    { id: 'Intermediaire', numeric: false, disablePadding: false, label: 'Intermédiaire' },
    { id: 'Localisation', numeric: false, disablePadding: false, label: 'Localisation' },
  ];

class Dashboard extends Component {
    constructor(props){
        super(props)
        AuthController.CheckAuth(this.props);
        const cookies = new Cookies();
        this.token = cookies.get('token')
        this.state = {
            data:[],
            listSecteur:[],
            listLocalisation:[],
            listAnnee:[],
        }
        this.secteur=null
        this.annee=null
        this.localisation=null
    }

    componentDidMount(){
        if(this.token!== undefined) {
            this.GetData(this.secteur,this.annee,this.localisation)
            this.GetListData('listSecteur','Secteur')
            this.GetListData('listLocalisation','Localisation')
            this.GetListData('listAnnee','DateSaisie')
        }
    }

    StandardArray = (listObject) => {
        let list = []
        for (let index = 0; index < listObject.length; index++) {
            let value = Object.values(listObject[index])[0]
            list.push({key:index,value:value})
        }
        return list
    }

    GetData = (secteur,annee,localisation) => {
        const url = process.env.REACT_APP_API_URL+'api/data';
            let fetchData = {
                method: 'POST',
                headers:{
                    'x-access-token':this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    secteur:secteur,
                    annee:annee === null ? annee : '%'+annee.substring(6),
                    localisation:localisation,
                })
            }
            fetch(url, fetchData)
            .then( async (resp) => {
                if (resp.ok) {
                    const jsonData = await resp.json();
                    this.setState({data:jsonData})
                } else {
                    console.error('server response : ' + resp.status);
                }
            });
    }

    GetListData = (stateName,dataName) => {
        const url = process.env.REACT_APP_API_URL+'api/data/distinct/'+dataName;
            let fetchData = {
                method: 'GET',
                headers:{'x-access-token':this.token}
            }
            fetch(url, fetchData)
            .then( async (resp) => {
                if (resp.ok) {
                    const jsonData = await resp.json();
                    let newArray = this.StandardArray(jsonData)
                    this.setState({[stateName]:newArray})
                } else {
                    console.error('server response : ' + resp.status);
                }
            });
    }

    ChangeSecteur = (value) =>{this.secteur = value}
    ChangeAnnee = (value) =>{this.annee = value}
    ChangeLocalisation = (value) =>{this.localisation = value}

    SeeData = (arrayIndex) => {
        this.props.history.push('/data',{listSocieteId:arrayIndex})
    }

    onSearchHandler = () => {
        this.GetData(this.secteur,this.annee,this.localisation)
    }

    render() {
        let { data, listSecteur, listAnnee, listLocalisation } = this.state
        return (
            <Container>
                <Paper>
                    <Row>
                        <Col xs={12} sm={6} md={3}>
                            <List listName='Secteur' list={listSecteur} changeHandler={this.ChangeSecteur}/>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <List listName='Année' list={listAnnee} changeHandler={this.ChangeAnnee}/>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <List listName='Localisation' list={listLocalisation} changeHandler={this.ChangeLocalisation}/>
                        </Col>
                        <Col xs={12} sm={6} md={3}>      
                            <Button variant="contained" color="primary" onClick={this.onSearchHandler}>
                                Recherche
                            </Button>
                        </Col>
                    </Row>
                </Paper>
                <Row>
                    <Col xs={12}>
                        <EnhancedTable rows={rows} data={data} SeeData={this.SeeData}/>
                    </Col>
                </Row>
            </Container>
          );
    }
  }
  export default withRouter(Dashboard)