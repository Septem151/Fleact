import React, { Component } from 'react';

export class Time extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: null
        };
    }

    componentDidMount() {
        this.updateTime();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.refreshToggle !== this.props.refreshToggle) {
            this.updateTime();
        }
    }

    updateTime() {
        // Send GET request
        fetch('http://localhost:5000/time' + (this.props.zone ? '?zone=' + this.props.zone : ''), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ time: data.formatted.number }));
    }

    render() {
        const { time } = this.state;
        return (
            <div className="center-div mtop-2">
                {time}
            </div>
        )
    }
}

export default Time
