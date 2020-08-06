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
        fetch('/api/time' + (this.props.zone ? '?zone=' + encodeURIComponent(this.props.zone) : ''), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if('error' in data)
                    this.setState({ time: data.error });
                else
                    this.setState({ time: data.formatted.number });
            });
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
