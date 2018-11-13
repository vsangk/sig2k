import React, { Component } from 'react';
import { getRecentMatches } from './services/api';
import MatchesTable from './MatchesTable';

class RecentMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      loading: false,
    };
  }

  componentDidMount() {
    const numberOfMatches = this.props.numberOfMatches || 10;
    this.setState({ loading: true });
    getRecentMatches(numberOfMatches).then(matches =>
      this.setState({ matches, loading: false })
    );
  }

  render() {
    return (
      <>
        <h2>Recent Matches</h2>
        <MatchesTable
          matchesData={this.state.matches}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default RecentMatches;
