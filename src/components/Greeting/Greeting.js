import React, { Component } from 'react';

export class Greeting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greeting: null,
        };
    }

    componentDidMount() {
        this.updateGreeting();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.name !== this.props.name) {
            this.updateGreeting();
        }
    }

    updateGreeting() {
        // Send GET request
        fetch('/api/greeting' + (this.props.name ? '?name=' + encodeURIComponent(this.props.name) : ''), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ greeting: data.greeting }));
    }

    render() {
        const { greeting } = this.state;
        return (
            <div className="center-div mtop-2">
                {greeting}
            </div>
        )
    }
}

export default Greeting
