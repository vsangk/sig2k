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
                id: "status",
            },
            { Header: 'Played', accessor: 'played' },
            { Header: 'Wins', accessor: 'wins' },
            { Header: 'Losses', accessor: 'losses' },
            { Header: 'Win Rate', id: 'win-rate', accessor: d => `${d.played > 0 ? (this.calculateWinRate(d.wins, d.losses) + "%") : "N/A"}` },

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
