import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import * as images from "./images/logos";
import { getPageSizeOptions } from './utils/reactTableUtils';

class MatchesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
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
        Header: 'Winner(s)',
        Cell: row => {
          return row.original.winners.map(winner => (
            <Link
              style={{ display: 'block' }}
              key={`${winner.user_name}-${row.index}`}
              to={`/users/${winner.user_name}`}
            >
              {winner.user_name}
            </Link>
          ));
        },
      },
      {
        Header: 'Loser(s)',
        Cell: row => {
          return row.original.losers.map(loser => (
            <Link
              style={{ display: 'block' }}
              key={`${loser.user_name}-${row.index}`}
              to={`/users/${loser.user_name}`}
            >
              {loser.user_name}
            </Link>
          ));
        },
      },
      {
          Header: 'Teams',
          Cell: (row) => {
              return <div style={{ justifyContent: 'center' }}>
                  <img alt="team logo" className="team-logo" width={20} src={this.getTeamImagePath(row.original.winner_team)}/> {row.original.winner_team}
                  &ensp;vs.&ensp;
                  {row.original.loser_team} <img alt="team logo" className="team-logo" width={20} src={this.getTeamImagePath(row.original.loser_team)}/>
              </div>
          },
      },
      { Header: 'Scores', id: 'scores', accessor: d => d.scores[0].reverse().join(':') },
      {
        Header: 'ELO Gain/Loss',
        id: 'eloDiff',
        accessor: d => `+${d.elo_gain} / -${d.elo_loss}`,
      },
    ];
    this.setState({ columns });
  }

  render() {
    return (
      <ReactTable
        className="table"
        data={this.props.matchesData}
        columns={this.state.columns}
        defaultPageSize={10}
        pageSizeOptions={getPageSizeOptions(this.props.matchesData)}
        loading={this.props.loading}
        loadingText="Loading..."
        noDataText="No matches found"
        getTrProps={(state, rowInfo, column) => {
          return {
            style: {
              alignItems: 'center',
              textAlign: 'center',
              fontSize: '1.3rem',
            },
          };
        }}
        getTheadThProps={(state, rowInfo, column) => ({
          style: {
            backgroundColor: '#fb653f',
            color: 'white',
            fontSize: '1.4rem',
            fontWeight: 600,
            padding: '1.2rem 1rem',
          }
        })}
      />
    );
  }
}
export default MatchesTable;
