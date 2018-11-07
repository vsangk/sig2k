import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import Leaderboard from './Leaderboard';
import UnrankedLeaderboard from './UnrankedLeaderboard';
import RecentMatches from './RecentMatches';

class Home extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <Leaderboard />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RecentMatches />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <UnrankedLeaderboard />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
