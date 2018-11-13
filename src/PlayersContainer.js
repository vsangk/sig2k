import React, { Component } from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import Players from "./Players";

class PlayersContainer extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <Players/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


export default PlayersContainer;
