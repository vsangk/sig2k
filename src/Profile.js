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
                    <Col md={6} mdPush={6}>
                        <div class="profile-header">
                            <Row>
                                <Col md={4} mdPush={8}>
                                    <img src={this.props.avatar} />
                                </Col>
                                <Col md={8} mdPull={8}>
                                    <h2>{this.props.user_name}</h2>
                                    <h2>{BASE_ELO + this.props.elo} ELO</h2>
                                    <h2>Favorite Team: {this.props.favorite_team}</h2>
                                </Col>
                            </Row>
                        </div>
                        <div class="profile-info">
                            <Row className="record-section">
                                <Col className="record-title" sm={3}>Record:</Col>
                                <Col className="wins" sm={3}>W{this.props.wins}</Col>
                                <Col className="losses" sm={3}>L{this.props.losses}</Col>
                            </Row>
                            <Row className="win-rate-section">
                                <Col className="win-rate-title"sm={9}>Win Percentage:</Col>
                                <Col className="win-rate" sm={3}>{this.calculateWinRate(this.props.wins, this.props.losses)}</Col>
                            </Row>
                            <Row className="streak-section">
                                <Col className="streak-title" sm={3}>Longest Streak:</Col>
                                <Col className="win-streak" sm={3}>W{this.props.winning_streak}</Col>
                                <Col className="lose-streak" sm={3}>L{this.props.losting_streak}</Col>
                            </Row>
                            <Row className="current-streak-section">
                                <Col className="current-streak-title" sm={9}>Win Percentage:</Col>
                                <Col className="current-streak" sm={3}>{this.currentStreakText(this.props.current_streak, this.props.current_streak_is_win)}</Col>
                            </Row>
                            <Row className="streak-section">
                                <Col className="streak-title" sm={3}>Elo History:</Col>
                                <Col className="win-streak" sm={3}>Max: {Math.max(this.props.elo_history) + BASE_ELO}</Col>
                                <Col className="lose-streak" sm={3}>Min: {Math.min(this.props.elo_history) + BASE_ELO}</Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={6} mdPull={6}>
                        <RecentMatches userName={this.props.user_name}></RecentMatches>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Profile;
