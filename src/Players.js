import React, { Component } from 'react';
import { getUsers } from './services/api';
import PlayersTable from "./PlayersTable";

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        getUsers().then(users =>
            this.setState({ users, loading: false })
        );
    }

    render() {
        return (
            <>
                <h2>Players</h2>
                <PlayersTable
                    playersData={this.state.users}
                    loading={this.state.loading}
                />
            </>
        );
    }
}

export default Players;
