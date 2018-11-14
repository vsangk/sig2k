import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

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

    componentDidMount() {
        const columns = [
            { Header: 'Team', accessor: 'name' },
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
