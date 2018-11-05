import React, { Component } from 'react';
import {Col, Grid, Row} from "react-bootstrap";
import RecentMatches from "./RecentMatches";

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
                <Row className="profile">
                    <Col md={6}>
                        <Row className="profile-header">
                            <Col md={4}>
                                <img className="avatar" src={this.props.userData.avatar} />
                            </Col>
                            <Col md={8}>
                                <h2>{this.props.userData.user_name}</h2>
                                <h2>{BASE_ELO + this.props.userData.elo} ELO</h2>
                                <h2>Favorite Team: {this.props.userData.avorite_team}</h2>
                            </Col>
                        </Row>
                        <Row className="profile-info">
                            <Row className="record-section">
                                <Col className="record-title" sm={3}>Record:</Col>
                                <Col className="wins" sm={3}>W{this.props.userData.wins}</Col>
                                <Col className="losses" sm={3}>L{this.props.userData.losses}</Col>
                            </Row>
                            <Row className="win-rate-section">
                                <Col className="win-rate-title"sm={9}>Win Percentage:</Col>
                                <Col className="win-rate" sm={3}>{this.calculateWinRate(this.props.userData.wins, this.props.userData.losses)}</Col>
                            </Row>
                            <Row className="streak-section">
                                <Col className="streak-title" sm={3}>Longest Streak:</Col>
                                <Col className="win-streak" sm={3}>W{this.props.userData.winning_streak}</Col>
                                <Col className="lose-streak" sm={3}>L{this.props.userData.losting_streak}</Col>
                            </Row>
                            <Row className="current-streak-section">
                                <Col className="current-streak-title" sm={9}>Win Percentage:</Col>
                                <Col className="current-streak" sm={3}>{this.currentStreakText(this.props.userData.current_streak, this.props.userData.current_streak_is_win)}</Col>
                            </Row>
                            <Row className="streak-section">
                                <Col className="streak-title" sm={3}>Elo History:</Col>
                                <Col className="win-streak" sm={3}>Max: {Math.max(this.props.userData.elo_history) + BASE_ELO}</Col>
                                <Col className="lose-streak" sm={3}>Min: {Math.min(this.props.userData.elo_history) + BASE_ELO}</Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <RecentMatches {...this.props.userMatches}></RecentMatches>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Profile;
