import React, { Component } from 'react';
import { getRankedPlayers } from './services/api';
import PlayersTable from './PlayersTable';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    getRankedPlayers().then(players =>
      this.setState({ players, loading: false })
    );
  }

  render() {
    return (
      <>
        <h2>Leaderboard</h2>
        <PlayersTable
          table="leaderboard"
          playersData={this.state.players}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default Leaderboard;
