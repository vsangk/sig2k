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
                    this.props.error === true
                    ? (
                        <div className="center not-found">
                            <img src="https://sports-images.vice.com/images/2017/01/25/when-nick-young-the-basketball-player-met-nick-young-the-meme-body-image-1485378510.jpg" alt=""/>
                            <h1>Error: User not found</h1>
                            <p>Please use a valid user name or ask that person to register on Slack with "2k register" then try again.</p>
                        </div>
                    ) : (
                        <Row className="profile">
                            <Col md={12}>
                                <Row className="profile-header">
                                    <Col md={4}>
                                        <img alt="avatar" className="avatar" src={this.props.userData.avatar} />
                                    </Col>
                                    <Col md={8}>
                                        <Row className="tag-line">
                                            <h1>{this.props.userData.user_name}</h1>
                                            <h2>Rank: {this.props.userData.wins + this.props.userData.wins >= 7 ? this.props.userData.rank : 'Unranked'}</h2>
                                            <h2>{BASE_ELO + this.props.userData.elo} ELO (Max: { Math.max.apply(Math, this.props.userData.elo_history) + BASE_ELO}, Min: { Math.min.apply(Math, this.props.userData.elo_history) + BASE_ELO})</h2>
                                            <h4>Record: {this.props.userData.wins}-{this.props.userData.losses} ({this.calculateWinRate(this.props.userData.wins, this.props.userData.losses)}%)</h4>
                                            <h4>Current Streak: {this.currentStreakText(this.props.userData.current_streak, this.props.userData.current_streak_is_win)} (Longest: W{this.props.userData.winning_streak}/L{this.props.userData.losing_streak})</h4>
                                            <h4>Most Played Team: {this.props.userData.most_played_team}</h4>
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
