import React, { Component } from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import {Paper} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class DataViewer extends Component {
    constructor(props){
        super(props)
        const cookies = new Cookies();
        this.token = cookies.get('token')
        this.listSocieteId = this.props.location.state.listSocieteId
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
        const url = process.env.REACT_APP_API_URL+'api/data/listId';
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
                {this.state.listSociete.map((Societe)=>{return(                
                    <Paper>
                        <Row>
                            <Col xs={12} sm={6} md={3}>
                                <p>{Societe.NomSociete}</p>
                                <p>{Societe.Secteur}</p>
                                <p>{Societe.DateSaisie}</p>
                                <p>{Societe.CA}</p>
                                <p>{Societe.Ebitda}</p>
                                <p>{Societe.Activite}</p>
                                <p>{Societe.Infos}</p>
                                <p>{Societe.TypeActionnariat}</p>
                                <p>{Societe.EntreeFond}</p>
                                <p>{Societe.Intermediaire}</p>
                                <p>{Societe.Localisation}</p>
                                <p>{Societe.SourceInfo}</p>
                            </Col>
                        </Row>
                    </Paper>
                )})}
            </Container>
          );
    }
  }
  export default withRouter(DataViewer);