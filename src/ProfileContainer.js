import React, { Component } from 'react';
import { getUser, getRecentMatchesByUser } from './services/api';
import Profile from './Profile';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userMatches: [],
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const user = this.props.match.params.user;
    Promise.all([getUser(user), getRecentMatchesByUser(user)]).then(
      ([userData, userMatches]) => {
        this.setState({ userData, userMatches, loading: false, error: false });
      }
    ).catch((error) => {
        this.setState({loading: false, error: true});
    });
  }

  componentWillReceiveProps(newProps) {
      this.setState({ loading: true });
      const user = newProps.match.params.user;
      Promise.all([getUser(user), getRecentMatchesByUser(user)]).then(
          ([userData, userMatches]) => {
              this.setState({ userData, userMatches, loading: false, error: false });
          }
      ).catch((error) => {
          this.setState({loading: false, error: true});
      });
  }

  render() {
    return(
        {
            ...this.state.loading ? <div className="center">Loading...</div> : (<Profile {...this.state} />)
        }
    );
  }
}

export default ProfileContainer;
