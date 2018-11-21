import React, { Component } from 'react';
import Home from './Home';
import ProfileContainer from './ProfileContainer';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'react-table/react-table.css';
import {Button, Form, FormControl, FormGroup, Nav, Navbar, NavItem} from "react-bootstrap";
import ReportContainer from "./ReportContainer";
import MatchesContainer from "./MatchesContainer";
import PlayersContainer from "./PlayersContainer";
import TeamsContainer from "./TeamsContainer";
import twok from "./images/2k.png";
import "./App.css";

class App extends Component {

    handleSubmit(e) {
        if (e) e.preventDefault();
        const userName = e.target.userName.value;
        if (userName || userName !== ''){
            window.location = '#/users/'+userName;
        }
    }

  render() {
    return (
      <Router>
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/">Sig<img className="App-logo" alt="the guru" src={twok} /></a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#/reports">
                        Reports
                    </NavItem>
                    <NavItem eventKey={2} href="#/matches">
                        Matches
                    </NavItem>
                    <NavItem eventKey={3} href="#/players">
                        Players
                    </NavItem>
                    <NavItem eventKey={4} href="#/teams">
                        Teams
                    </NavItem>
                </Nav>
                <Navbar.Form pullRight>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <FormControl type="text" name='userName' placeholder="User Profile" />
                        </FormGroup>{' '}
                        <Button type="submit">Go</Button>
                    </Form>
                </Navbar.Form>
            </Navbar>
          <Route path="/" exact component={Home} />
          <Route path="/users/:user" component={ProfileContainer} />
          <Route path="/reports" component={ReportContainer} />
          <Route path="/matches" component={MatchesContainer} />
          <Route path="/players" component={PlayersContainer} />
          <Route path="/teams" component={TeamsContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
