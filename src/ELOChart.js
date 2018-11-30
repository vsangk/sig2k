import React, { Component } from 'react';
import {FlexibleWidthXYPlot, HorizontalGridLines, LineSeries, YAxis} from 'react-vis';

class ELOChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        if (this.props.eloHistory) {
            let data = [];
            let index = 0;
            for (index; index < this.props.eloHistory.length; index++) {
                data[index] = {x: index, y: (this.props.eloHistory[index] + 1200)};
            }
            this.setState({data: data});
        }
    }

    render() {
        return (
            <FlexibleWidthXYPlot height={300}>
                <HorizontalGridLines/>
                <YAxis/>
                <LineSeries data={this.state.data}/>
            </FlexibleWidthXYPlot>
        );
    }
}

export default ELOChart;
