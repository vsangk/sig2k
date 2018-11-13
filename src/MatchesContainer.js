import React, { Component } from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import RecentMatches from "./RecentMatches";

class MatchesContainer extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <RecentMatches numberOfMatches={30}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}


export default MatchesContainer;
