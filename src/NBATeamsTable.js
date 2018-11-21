import React, { Component } from 'react';
import ReactTable from 'react-table';
import * as images from './images/logos';

class NBATeamsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
        };
    }

    calculateWinRate(wins, losses) {
        return parseFloat(((wins / (wins + losses))*100).toFixed(2));
    }

    getTeamImagePath(teamName) {
        if (teamName === "76ers") {
            return images.Sixers;
        }
        if (teamName === "Trail Blazers") {
            return images.TrailBlazers;
        } else {
            return images[teamName];
        }
    }

    componentDidMount() {
        const columns = [
            {
                Header: "Team",
                Cell: (row) => {
                    return <div><img alt="team logo" className="team-logo" width={40} src={this.getTeamImagePath(row.original.name)}/>  {row.original.name}</div>
                },
                id: "team",
            },
            { Header: 'Played', accessor: 'played' },
            { Header: 'Wins', accessor: 'wins' },
            { Header: 'Losses', accessor: 'losses' },
            {
                Header: "Win Rate",
                Cell: (row) => {
                    return <div className={(row.original.wins > row.original.losses ? 'green' : '') + (row.original.wins < row.original.losses ? 'red' : '')}>{row.original.played > 0 ? (this.calculateWinRate(row.original.wins, row.original.losses)+ "%") : "N/A"}</div>
                },
                id: "win-rate",
            },
        ];
        this.setState({ columns });
    }

    render() {
        return (
            <ReactTable
                data={this.props.teamsData}
                columns={this.state.columns}
                defaultPageSize={30}
                loading={this.props.loading}
                loadingText="Loading..."
                noDataText="No reports found"
            />
        );
    }
}
export default NBATeamsTable;
