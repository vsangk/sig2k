import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
import trophyNba from './trophy-nba.png';
import trophyGLeague from './trophy-gleague.png';

const currentStreakText = (currentStreak, isCurrentStreakWin) => {
  return isCurrentStreakWin ? 'W' + currentStreak : 'L' + currentStreak;
};

class PlayersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
    };
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
      { Header: 'Favorite Team', accessor: 'favorite_team' },
    ];
    this.setState({ columns });
  }

  render() {
    return (
      <ReactTable
        className="table"
        data={this.props.playersData}
        columns={this.state.columns}
        defaultPageSize={10}
        loading={this.props.loading}
        loadingText="Loading..."
        noDataText="No players found"
        getTrProps={(state, rowInfo, column) => {
          return {
            style: {
              alignItems: 'center',
            },
          };
        }}
      />
    );
  }
}
export default PlayersTable;
