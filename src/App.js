import React, { Component } from 'react';
import Home from './Home';
import ProfileContainer from './ProfileContainer';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'react-table/react-table.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/users/:user" component={ProfileContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
