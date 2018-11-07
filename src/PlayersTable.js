import React, { Component } from 'react';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';

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
      { Header: 'Rank', accessor: 'rank' },
      {
        Header: 'Name',
        accessor: 'user_name',
        Cell: props => <Link to={`/users/${props.value}`}>{props.value}</Link>,
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
        data={this.props.playersData}
        columns={this.state.columns}
        defaultPageSize={10}
        loading={this.props.loading}
        loadingText="Loading..."
        noDataText="No players found"
      />
    );
  }
}
export default PlayersTable;
