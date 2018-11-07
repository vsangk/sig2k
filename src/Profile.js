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
                <Row className="profile">
                    <Col md={6}>
                        <Row className="profile-header">
                            <Col md={4}>
                                <img className="avatar" src={this.props.userData.avatar} />
                            </Col>
                            <Col md={8}>
                                <h1>{this.props.userData.user_name}</h1>
                                <h2>{BASE_ELO + this.props.userData.elo} ELO</h2>
                            </Col>
                        </Row>
                        <Row className="profile-info">
                            <Row className="favorite-team-section">
                                <Col className="favorite-team-title" sm={8}>Favorite Team:</Col>
                                <Col className="favorite-team" sm={4}>{this.props.userData.favorite_team}</Col>
                            </Row>
                            <Row className="record-section">
                                <Col className="record-title" sm={4}>Record:</Col>
                                <Col className="wins" sm={4}>W{this.props.userData.wins}</Col>
                                <Col className="losses" sm={4}>L{this.props.userData.losses}</Col>
                            </Row>
                            <Row className="win-rate-section">
                                <Col className="win-rate-title"sm={8}>Win Percentage:</Col>
                                <Col className="win-rate" sm={4}>{this.calculateWinRate(this.props.userData.wins, this.props.userData.losses)}</Col>
                            </Row>
                            <Row className="current-streak-section">
                                <Col className="current-streak-title" sm={8}>Current Streak:</Col>
                                <Col className="current-streak" sm={4}>{this.currentStreakText(this.props.userData.current_streak, this.props.userData.current_streak_is_win)}</Col>
                            </Row>
                            <Row className="streak-section">
                                <Col className="streak-title" sm={4}>Longest Streak:</Col>
                                <Col className="win-streak" sm={4}>W{this.props.userData.winning_streak}</Col>
                                <Col className="lose-streak" sm={4}>L{this.props.userData.losting_streak}</Col>
                            </Row>
                            <Row className="elo-section">
                                <Col className="elo-history-title" sm={4}>Elo History:</Col>
                                <Col className="max-elo" sm={4}>Max: { Math.max.apply(Math, this.props.userData.elo_history) + BASE_ELO}</Col>
                                <Col className="min-elo" sm={4}>Min: { Math.min.apply(Math, this.props.userData.elo_history) + BASE_ELO}</Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <MatchesTable matchesData={this.props.userMatches} loading={this.props.loading} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Profile;
