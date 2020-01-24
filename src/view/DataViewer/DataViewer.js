import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {Paper,Typography,Toolbar,IconButton,AppBar, Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';

import './DataViewer.css';
import { StylesContext } from '@material-ui/styles/StylesProvider';

class DataViewer extends Component {
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.token = cookies.get('token')
        this.listSocieteId = this.props.location.state.listSocieteId
        this.type = this.props.location.state.type === 'dealsChauds' ? 'deal' : 'millesime'
        console.log(this.props.location.state)
        this.state = {
            listSociete:[]
        }
    }

    componentDidMount(){        
        if(this.token!== undefined) {
            this.GetData(this.listSocieteId)
        }
    }


    GetData = (listSocieteId) => {
        const url = process.env.REACT_APP_API_URL+'api/data/'+this.type+'/listId';
            let fetchData = {
                method: 'POST',
                headers:{
                    'x-access-token':this.token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    listSocieteId:listSocieteId,
                })
            }
            fetch(url, fetchData)
            .then( async (resp) => {
                if (resp.ok) {
                    const jsonData = await resp.json();
                    this.setState({listSociete:jsonData})
                } else {
                    console.error('server response : ' + resp.status);
                }
            });
    }


    render() {
        return (
            <Container className="DataViewer">
                <AppBar position="static" color="default">
                    <Toolbar>
                        {/* <IconButton edge="start" color="inherit" aria-label="Retour" onFocus={()=>{this.props.history.goBack()}}>
                            <ArrowBack />
                        </IconButton> */}
                        <Button variant="contained" size="small" aria-label="Retour" onFocus={()=>{this.props.history.goBack()}}>
                            <ArrowBack />
                        </Button>
                        <Typography className="title" variant="h6">Visualisation des données</Typography>
                    </Toolbar>
                </AppBar>
                {this.state.listSociete.map((Societe)=>{
                    return(this.type === 'deal' ?             
                    <Paper className='paper'>
                        <Row>
                            <Col >
                                <Typography align='center' color='primary' variant='h5'>{Societe.NomSociete}</Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} sm={6}>
                                {Societe.CA && <Typography align='center' variant='h7'><b>CA:</b> {Societe.CA} M€</Typography>}
                            </Col>
                            <Col xs={6} sm={6}>
                                {Societe.Ebitda && <Typography align='center' variant='h7'><b>Ebitda:</b> {Societe.Ebitda}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                {Societe.Secteur && <Typography align='center' variant='h7'>{Societe.Secteur}</Typography>}
                            </Col>
                            <Col xs={12} sm={6}>
                                {Societe.Localisation && <Typography align='center' variant='h7'>{Societe.Localisation}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {Societe.Activite && <Typography variant='h7'>{Societe.Activite}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {Societe.Infos && <Typography variant='h7'>{Societe.Infos}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            {Societe.TypeActionnariat && <Col xs={12}> <Typography variant='h7'><b>Type actionnariat:</b> {Societe.TypeActionnariat}</Typography> </Col>}
                            {Societe.Actionnaire && <Col xs={12}> <Typography variant='h7'><b>Actionnaire:</b> {Societe.Actionnaire}</Typography> </Col>}
                            {Societe.Intermediaire && <Col xs={12}> <Typography variant='h7'><b>Intermédiraire:</b> {Societe.Intermediaire}</Typography> </Col>}
                            {Societe.EntreeFond && <Col xs={12}> <Typography variant='h7'><b>Entree du Fond:</b> {Societe.EntreeFond}</Typography> </Col>}
                            {Societe.DateSaisie && <Col xs={12}> <Typography variant='h7'><b>Date de saisie:</b> {Societe.DateSaisie}</Typography> </Col>}
                            {Societe.SourceInfo && <Col xs={12}> <Typography variant='h7'><b>Source:</b> {Societe.SourceInfo}</Typography> </Col>}
                        </Row>
                    </Paper> 
                    :             
                    <Paper className='paper'>
                        <Row>
                            <Col >
                                <Typography align='center' color='primary' variant='h5'>{Societe.NomParticipation}</Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6} sm={6}>
                                {Societe.CA && <Typography align='center' variant='h7'><b>CA:</b> {Societe.CA} M€</Typography>}
                            </Col>
                            <Col xs={6} sm={6}>
                                {Societe.DateCA && <Typography align='center' variant='h7'><b>Date du CA:</b> {Societe.DateCA}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} sm={6}>
                                {Societe.Secteur && <Typography align='center' variant='h7'>{Societe.Secteur}</Typography>}
                            </Col>
                            <Col xs={12} sm={6}>
                                {Societe.Region && <Typography align='center' variant='h7'>{Societe.Region}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {Societe.Description && <Typography align='center' variant='h7'>{Societe.Description}</Typography>}
                            </Col>
                        </Row>
                        <Row>
                            {Societe.MaisonGestion && <Col xs={12}> <Typography align='left' variant='h7'><b>Maison de gestion:</b> {Societe.MaisonGestion}</Typography> </Col>}
                            {Societe.DernierInvestissement && <Col xs={12}> <Typography align='left' variant='h7'><b>Dernier investissement:</b> {Societe.DernierInvestissement}</Typography> </Col>}
                            {Societe.TypePosition && <Col xs={12}> <Typography align='left' variant='h7'><b>Type de position:</b> {Societe.TypePosition}</Typography> </Col>}
                            {Societe.VehiculeAssocie && <Col xs={12}> <Typography align='left' variant='h7'><b>Vehicule associé:</b> {Societe.VehiculeAssocie}</Typography> </Col>}
                            {Societe.AppetenceBuildUp && <Col xs={12}> <Typography align='left' variant='h7'><b>Appetence build_up:</b> {Societe.AppetenceBuildUp}</Typography> </Col>}
                        </Row>
                    </Paper>
                )})}
            </Container>
          );
    }
  }
  export default withRouter(DataViewer);