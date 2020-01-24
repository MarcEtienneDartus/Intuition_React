import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {Paper,Button,FormControl,InputLabel,Input,Tabs,Tab,Divider} from '@material-ui/core';
import AuthController from '../../component/AuthController/AuthController';
import EnhancedTable from '../../component/EnhancedTable/EnhancedTable';
import { withRouter } from 'react-router-dom';
import List from '../../component/List/List';

import './Dashboard.css';

const rowsDealsChauds = [
    { id: 'NomSociete', numeric: false, disablePadding: true, label: 'Société' },
    { id: 'Date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'Activite', numeric: false, disablePadding: false, label: 'Activité' },
    { id: 'Actionnaire', numeric: false, disablePadding: false, label: 'Actionnaire' },
    { id: 'Intermediaire', numeric: false, disablePadding: false, label: 'Intermédiaire' },
  ];

const rowsMillesimes = [
    { id: 'NomParticipation', numeric: false, disablePadding: true, label: 'Nom de Participation' },
    { id: 'Date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'Description ', numeric: false, disablePadding: false, label: 'Description ' },
    { id: 'MaisonGestion', numeric: false, disablePadding: false, label: 'Maison de gestion' },
    { id: 'TypePosition', numeric: false, disablePadding: false, label: 'Type de position' },
];

class Dashboard extends Component {
    constructor(props){
        super(props)
        AuthController.CheckAuth(this.props);
        const cookies = new Cookies();
        this.token = cookies.get('token')
        this.state = {
            dataDealsChauds:[],
            dataMillesimes:[],
            listSecteur:[],
            tabValue:0,
        }
        this.secteur=null
        this.activite = null
        this.annee = null
    }

    componentDidMount(){
        if(this.token!== undefined) {
            this.GetData(this.secteur,this.activite,this.annee,'deal')
            this.GetData(this.secteur,this.activite,this.annee,'milessime')
            
            this.GetListData('listSecteur','Secteur')
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

    GetData = (secteur,activite,annee,type) => {
        const url = process.env.REACT_APP_API_URL+'api/data/'+type;
            let fetchData = {
                method: 'POST',
                headers:{
                    'x-access-token':this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    secteur:secteur,
                    activite:activite === null || activite === '' ?null:'%'+activite+'%',
                    annee:annee === null || annee === '' ?null:'%'+annee,
                })
            }
            fetch(url, fetchData)
            .then( async (resp) => {
                if (resp.ok) {
                    const jsonData = await resp.json();
                    if(type === 'deal') this.setState({dataDealsChauds:jsonData})
                    else this.setState({dataMillesimes:jsonData})
                } else {
                    console.error('server response : ' + resp.status);
                }
            });
    }

    GetListData = (stateName,dataName) => {
        const url = process.env.REACT_APP_API_URL+'api/data/header/distinct/'+dataName;
            let fetchData = {
                method: 'GET',
                headers:{'x-access-token':this.token}
            }
            fetch(url, fetchData)
            .then( async (resp) => {
                if (resp.ok) {
                    const jsonData = await resp.json();
                    console.log(jsonData)
                    let newArray = this.StandardArray(jsonData)
                    this.setState({[stateName]:newArray})
                } else {
                    console.error('server response : ' + resp.status);
                }
            });
    }

    ChangeSecteur = (value) =>{this.secteur = value}

    SeeData = (arrayIndex,type) => {
        this.props.history.push('/data',{listSocieteId:arrayIndex,type:type})
    }

    onSearchHandler = () => {
        this.GetData(this.secteur,this.activite,this.annee,'deal')
        this.GetData(this.secteur,this.activite,this.annee,'millesime')
    }

    handleTabChange = (event, value) => {
        console.log(value)
        this.setState({ tabValue : value });
      };

    render() {
        let { dataDealsChauds, dataMillesimes, listSecteur, tabValue } = this.state
        return (
            <Container className="Dashboard">
                <Paper className='menu'>
                    <Row>
                        <Col xs={12} sm={12} md={4}>          
                            <FormControl margin="normal" fullWidth>
                                <List listName='Secteur' list={listSecteur} changeHandler={this.ChangeSecteur}/>
                            </FormControl>
                        </Col>
                        <Col xs={12} sm={2} md={2}>                            
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="annee">Année</InputLabel>
                                <Input id="annee" name="annee" onChange={text => {this.annee=text.target.value}}/>
                            </FormControl>
                        </Col>
                        <Col xs={12} sm={10} md={4}>                            
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="activite">Recherche par mot clef</InputLabel>
                                <Input id="activite" name="activite" onChange={text => {this.activite=text.target.value}}/>
                            </FormControl>
                        </Col>
                        <Col xs={12} sm={12} md={2}> 
                            <div className='button'>
                                <Button variant="contained" color="primary" onClick={this.onSearchHandler}>Recherche</Button>
                            </div>          
                        </Col>
                    </Row>
                </Paper>
                <Row>
                    <Col xs={12}>
                        <Paper>

                            <Tabs value={tabValue} onChange={this.handleTabChange} centered>
                                <Tab label="Deals Chauds" />
                                <Tab label="Millésimes" />
                            </Tabs>
                            <Divider light/>
                            {tabValue === 0 && <EnhancedTable rows={rowsDealsChauds} data={dataDealsChauds} SeeData={this.SeeData} type={'dealsChauds'}/>}
                            {tabValue === 1 && <EnhancedTable rows={rowsMillesimes} data={dataMillesimes} SeeData={this.SeeData} type={'millesimes'}/>}
                        </Paper>
                    </Col>
                </Row>
            </Container>
          );
    }
  }
  export default withRouter(Dashboard)