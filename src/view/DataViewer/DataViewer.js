import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {Paper,Typography} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import './DataViewer.css';

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
            <Container>
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
                            <Col>
                                {Societe.TypeActionnariat && <Typography variant='h7'><b>Type actionnariat:</b> {Societe.TypeActionnariat}</Typography>}
                                {Societe.Intermediaire && <Typography variant='h7'><b>Intermédiraire:</b> {Societe.Intermediaire}</Typography>}
                                {Societe.EntreeFond && <Typography variant='h7'><b>Entree du Fond:</b> {Societe.EntreeFond}</Typography>}
                                {Societe.DateSaisie && <Typography variant='h7'><b>Date de saisie:</b> {Societe.DateSaisie}</Typography>}
                                {Societe.SourceInfo && <Typography variant='h7'><b>Source:</b> {Societe.SourceInfo}</Typography>}
                            </Col>
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
                            <Col>
                                {Societe.MaisonGestion && <Typography align='left' variant='h7'><b>Maison de gestion:</b> {Societe.MaisonGestion}</Typography>}
                                {Societe.DernierInvestissement && <Typography align='left' variant='h7'><b>Dernier investissement:</b> {Societe.DernierInvestissement}</Typography>}
                                {Societe.TypePosition && <Typography align='left' variant='h7'><b>Type de position:</b> {Societe.TypePosition}</Typography>}
                                {Societe.VehiculeAssocie && <Typography align='left' variant='h7'><b>Vehicule associé:</b> {Societe.VehiculeAssocie}</Typography>}
                                {Societe.AppetanceBuildUp && <Typography align='left' variant='h7'><b>Appetance build_up:</b> {Societe.AppetanceBuildUp}</Typography>}
                            </Col>
                        </Row>
                    </Paper>
                )})}
            </Container>
          );
    }
  }
  export default withRouter(DataViewer);