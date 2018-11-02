import React, { Component } from 'react';
import { getUser, getRecentMatchesByUser } from './services/api';
import Profile from './Profile';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userMatches: {},
    };
  }

  componentDidMount() {
    const user = this.props.match.params.user;
    Promise.all([getUser(user), getRecentMatchesByUser(user)]).then(
      ([userData, userMatches]) => {
        this.setState({ userData, userMatches });
      }
    );
  }

  render() {
    return <Profile {...this.state.userData} {...this.state.userMatches} />;
  }
}

export default ProfileContainer;
