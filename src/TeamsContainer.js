import React, { Component } from 'react';
import {getUserTeams} from './services/api';
import * as _ from "underscore";
import NBATeams from "./NBATeams";
import NBATeamsTable from "./NBATeamsTable";
import "./Teams.css";

class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            loading: false,
            error: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        getUserTeams().then(
            (userTeams) => {
                let groupedTeams = _.extend(_.object(NBATeams, _.times(NBATeams.length, () => [])), _.groupBy(userTeams, team => team.team_name));
                const teams = _(groupedTeams).map(function(g, key) {
                    return {
                        name: key,
                        wins: _(g).reduce(function (m, x) {
                            return m + x.wins;
                        }, 0),
                        losses: _(g).reduce(function (m, x) {
                            return m + x.losses;
                        }, 0),
                        played: _(g).reduce(function (m, x) {
                            return m + x.played;
                        }, 0),
                    }
                });
                this.setState({ teams, loading: false, error: false });
            }
        ).catch((error) => {
            this.setState({loading: false, error: true});
        });
    }

    render() {
        return(
            {
                ...this.state.loading ?
                    <div className="center">Loading...</div>
                    : (
                        <div className="teams-container">
                            <h1>Teams</h1>
                            <NBATeamsTable teamsData={this.state.teams} loading={this.state.loading} />
                        </div>
                    )
            }
        );
    }
}

export default ReportContainer;
