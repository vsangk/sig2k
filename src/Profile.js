import React, { Component } from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import MatchesTable from "./MatchesTable";
import './Profile.css';

const BASE_ELO = 1200;

class Profile extends Component {
    calculateWinRate(wins, losses) {
        return ((wins / (wins + losses))*100).toFixed(2);
    }

    currentStreakText(currentStreak, isCurrentStreakWin) {
        return isCurrentStreakWin ? "W" + currentStreak : "L" + currentStreak;
    }

    render() {
        return (
            <Grid>
                {
                    Object.keys(this.props.userData).length === 0
                    ? <div className="center">Loading...</div>
                    : (
                        <Row className="profile">
                            <Col md={12}>
                                <Row className="profile-header">
                                    <Col md={4}>
                                        <img alt="avatar" className="avatar" src={this.props.userData.avatar} />
                                    </Col>
                                    <Col md={8}>
                                        <Row className="tag-line">
                                            <h1>{this.props.userData.user_name}</h1>
                                            <h2>{BASE_ELO + this.props.userData.elo} ELO (Max: { Math.max.apply(Math, this.props.userData.elo_history) + BASE_ELO}, Min: { Math.min.apply(Math, this.props.userData.elo_history) + BASE_ELO})</h2>
                                            <h4>Record: {this.props.userData.wins}-{this.props.userData.losses} ({this.calculateWinRate(this.props.userData.wins, this.props.userData.losses)}%)</h4>
                                            <h4>Current Streak: {this.currentStreakText(this.props.userData.current_streak, this.props.userData.current_streak_is_win)} (Longest: W{this.props.userData.winning_streak}/L{this.props.userData.losing_streak})</h4>
                                            <h4>Favorite Team: {this.props.userData.favorite_team}</h4>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="recent-matches">
                                    <h1>Recent Matches</h1>
                                    <MatchesTable matchesData={this.props.userMatches} loading={this.props.loading} />
                                </Row>
                            </Col>
                        </Row>
                    )
                }
            </Grid>
        );
    }
}

export default Profile;
