import React, { Component } from 'react';
import {getOutstandingReports, getUsers} from './services/api';
import ReportsTable from "./ReportsTable";
import CreateReport from "./createReport";

class ReportContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            reports: [],
            loading: false,
            error: false,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        Promise.all([getUsers(), getOutstandingReports()]).then(
            ([users, reports]) => {
                this.setState({ users, reports, loading: false, error: false });
            }
        ).catch((error) => {
            this.setState({loading: false, error: true});
        });
    }

    render() {
        return(
            {
                ...this.state.loading ?
                    <div className="center">Loading...</div>
                    : (
                        <div className="reports-container">
                            <CreateReport users={this.state.users} loading={this.state.loading}/>
                            <h1>Outstanding Reports</h1>
                            <ReportsTable reportsData={this.state.reports} loading={this.state.loading} />
                        </div>
                    )
            }
        );
    }
}

export default ReportContainer;
