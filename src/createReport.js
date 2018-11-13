import React, { Component } from 'react';
import { createReport } from './services/api';
import NBATeams from './NBATeams';
import {Button, Col, ControlLabel, Form, FormControl, Row} from "react-bootstrap";
import './Report.css';

const validationErrors = {
    REPORT_EMPTY: 'Please fill out the report.',
    PLAYERS_MISSING: 'Please ensure that you have a reporter and opponent',
    PLAYERS_NOT_UNIQUE: 'Please ensure that you have unique players on each team.',
    INVALID_SCORES: 'Please check to see that you have entered valid scores.',
    TEAMS_MISSING: 'Please check to see that you have entered teams played for each team.'
};

class CreateReport extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            reporter: '',
            teammate: '',
            opponent1: '',
            opponent2: '',
            score: [],
            reporter_team: '',
            opponent_team: '',
            submitting: false,
            error: validationErrors.REPORT_EMPTY,
        };
    }

    checkPlayerUniqueness(players) {
        const seen = new Set();
        for (let i = 0; i < players.length; i++) {
            let p = players[i];
            if (seen.has(p)) {
                return false;
            } else if (p !== "") {
                seen.add(p);
            }
        }
        return true;
    }

    validateState() {
        if (this.state.reporter === '' || this.state.opponent1 === '') {
            this.setState({error: validationErrors.PLAYERS_MISSING});
            console.log('need a reporter and an opponent');
            return false;
        }

        const players = [this.state.reporter, this.state.teammate, this.state.opponent1, this.state.opponent2];
        if (this.checkPlayerUniqueness(players) === false) {
            this.setState({error: validationErrors.PLAYERS_NOT_UNIQUE});
            console.log('players not unique');
            return false;
        }
        if (this.state.score.length < 2 || this.state.score[0] === '' || this.state.score[0] < 0 || this.state.score[1] === '' || this.state.score[1] < 0) {
            this.setState({error: validationErrors.INVALID_SCORES});
            console.log('invalid scores');
            return false;
        }


        if (this.state.reporter_team === '' || this.state.opponent_team === ''){
            this.setState({error: validationErrors.TEAMS_MISSING});
            console.log('need teams');
            return false;
        }
        this.setState({error: null});
        return true;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    combineTeammates() {
        if (this.state.teammate === ''){
            return [this.state.reporter];
        } else {
            return [this.state.reporter, this.state.teammate];
        }
    }
    combineOpponents() {
        if (this.state.opponent2 === ''){
            return [this.state.opponent1];
        } else {
            return [this.state.opponent1, this.state.opponent2];
        }
    }

    handleScoreChange(e) {
        let score = this.state.score;
        if (e.target.name === "reporter_score") {
            score[0] = Number(e.target.value);
        } else if (e.target.name === "opponent_score") {
            score[1] = Number(e.target.value);
        }
        this.setState({score: score});
    }

    handleSubmit(e){
        if(this.validateState()){
            const report = {
                reporter_ids: this.combineTeammates(),
                opponent_ids: this.combineOpponents(),
                scores: [this.state.score],
                reporter_team: this.state.reporter_team,
                opponent_team: this.state.opponent_team,
            };
            console.log(report);
            this.setState({submitting: true});
           createReport(report).then(() => {
               this.setState({submitting: false});
           });
        } else{
            if (e) e.preventDefault();
            alert(this.state.error);
        }
    }

    render() {
        return (
            <div className="create-report">
                <h1>Report Game</h1>
                <Form className="create-report-form" horizontal onSubmit={this.handleSubmit}>
                    <ControlLabel><h2>Your Team</h2></ControlLabel>
                    <Row>
                        <Col md={3}>
                            <FormControl name="reporter" componentClass="select" placeholder="" onChange={this.handleChange}>
                                <option value="">You</option>
                                {this.props.users.map(option =>
                                    <option key={option.id} value={option.id}>{option.user_name}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <FormControl name="teammate" componentClass="select" placeholder="" onChange={this.handleChange}>
                                <option value="">Teammate</option>
                                {this.props.users.map(option =>
                                    <option key={option.id} value={option.id}>{option.user_name}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <FormControl name="reporter_team" componentClass="select" placeholder="" onChange={this.handleChange}>
                                <option value="">Team Used</option>
                                {NBATeams.map((option, index) =>
                                    <option key={index} value={option}>{option}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <FormControl name="reporter_score" componentClass="input" placeholder="Score" type="number" onChange={this.handleScoreChange} />
                        </Col>
                    </Row>
                    <ControlLabel><h2>Their Team</h2></ControlLabel>
                    <Row>
                        <Col md={3}>
                            <FormControl name="opponent1" componentClass="select" placeholder="" onChange={this.handleChange}>
                                <option value="">Opponent 1</option>
                                {this.props.users.map(option =>
                                    <option key={option.id} value={option.id}>{option.user_name}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <FormControl name="opponent2" componentClass="select" placeholder="" onChange={this.handleChange}>
                                <option value="">Opponent 2</option>
                                {this.props.users.map(option =>
                                    <option key={option.id} value={option.id}>{option.user_name}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <FormControl name="opponent_team" componentClass="select" placeholder="" onChange={this.handleChange}>
                                <option value="">Team Used</option>
                                {NBATeams.map((option, index) =>
                                    <option key={index} value={option}>{option}</option>
                                )}
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <FormControl name="opponent_score" componentClass="input" placeholder="Score" type="number" onChange={this.handleScoreChange} />
                        </Col>
                    </Row>
                    <Row className="button-container">
                        <Col md={3} />
                        <Col md={6}>
                            <Button className="submit-report" type="submit">Submit Report</Button>
                        </Col>
                        <Col md={3} />
                    </Row>
                </Form>
            </div>
        );
    }
}

export default CreateReport;
