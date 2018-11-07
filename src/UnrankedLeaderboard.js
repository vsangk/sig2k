import React, { Component } from 'react';
import { getUnrankedPlayers } from './services/api';
import PlayersTable from './PlayersTable';

class UnrankedLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getUnrankedPlayers().then(players =>
      this.setState({ players, loading: false })
    );
  }

  render() {
    return (
      <>
        <h2>{'Unranked (< 8 Games Played)'}</h2>
        <PlayersTable
          playersData={this.state.players}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default UnrankedLeaderboard;
