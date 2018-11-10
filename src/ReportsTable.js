import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

class ReportsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
        };
    }

    componentDidMount() {
        const columns = [
            {
                Header: 'Reporter(s)',
                Cell: row => {
                    return row.original.reporters.map(reporter => (
                        <Link
                            style={{ display: 'block' }}
                            key={`${reporter.user_name}-${row.index}`}
                            to={`/users/${reporter.user_name}`}
                        >
                            {reporter.user_name}
                        </Link>
                    ));
                },
            },
            {
                Header: 'Opponent(s)',
                Cell: row => {
                    return row.original.opponents.map(opponent => (
                        <Link
                            style={{ display: 'block' }}
                            key={`${opponent.user_name}-${row.index}`}
                            to={`/users/${opponent.user_name}`}
                        >
                            {opponent.user_name}
                        </Link>
                    ));
                },
            },
            { Header: 'Teams', id: 'teams', accessor: d => `${d.reporter_team} vs. ${d.opponent_team}` },
            { Header: 'Scores', id: 'scores', accessor: d => d.scores[0].reverse().join(':') },
        ];
        this.setState({ columns });
    }

    render() {
        return (
            <ReactTable
                data={this.props.reportsData}
                columns={this.state.columns}
                defaultPageSize={10}
                loading={this.props.loading}
                loadingText="Loading..."
                noDataText="No reports found"
            />
        );
    }
}
export default ReportsTable;
