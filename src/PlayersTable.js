import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import trophyNba from './trophy-nba.png';
import trophyGLeague from './trophy-gleague.png';
import * as images from "./images/logos";
import { currentStreakText, getPageSizeOptions } from './utils/reactTableUtils';

class PlayersTable extends Component {
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
        Header: 'Rank',
        Cell: row => (
          <div
            style={{
              width: '100%',
              height: row.index === 0 ? '60px' : '100%',
              marginRight: row.index === 0 ? '-10px' : '',
              textAlign: 'center',
            }}
          >
            {row.index === 0 ? (
              <span>
                <img
                  src={
                    this.props.table === 'leaderboard'
                      ? trophyNba
                      : trophyGLeague
                  }
                  style={{ height: '60px' }}
                  alt=""
                />
              </span>
            ) : (
              <span>{row.index + 1}</span>
            )}
          </div>
        ),
      },
      {
        Header: 'Name',
        accessor: 'user_name',
        Cell: row => <Link to={`/users/${row.value}`}>{row.value}</Link>,
      },
      { Header: 'ELO', id: 'elo', accessor: d => d.elo + 1200 },
      { Header: 'Wins', accessor: 'wins' },
      { Header: 'Losses', accessor: 'losses' },
      {
        Header: 'Current Streak',
        id: 'currentStreak',
        accessor: d =>
          currentStreakText(d.current_streak, d.current_streak_is_win),
      },
        {
            Header: "Most Played Team",
            Cell: (row) => {
                console.log(row);
                return <div style={{ textAlign: 'left', fontWeight: 600 }}>
                        <img alt="team logo" className="team-logo" width={30} height={30} src={this.getTeamImagePath(row.original.most_played_team)}/>
                        <span style={{paddingLeft: '10px'}}>{row.original.most_played_team}</span>
                       </div>
            },
            id: "status",
        },
    ];
    this.setState({ columns });
  }

  render() {
    return (
      <ReactTable
        className="table -highlight"
        data={this.props.playersData}
        columns={this.state.columns}
        defaultPageSize={10}
        pageSizeOptions={getPageSizeOptions(this.props.playersData)}
        showPageJump={false}
        loading={this.props.loading}
        loadingText="Loading..."
        noDataText="No players found"
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
export default PlayersTable;
