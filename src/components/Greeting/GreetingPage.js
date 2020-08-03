import React, { Component } from 'react';
import Greeting from './Greeting';

export class GreetingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            greeting: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value.trim() });
    }

    handleSubmit(event) {
        if (this.state.name) {
            this.setState({
                greeting: <Greeting name={this.state.name} />
            });
        } else {
            this.setState({
                greeting: <Greeting />
            })
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="center-div">
                    <label>
                        Name:
                    <input className="greeting-input" type="text" value={this.state.name} onChange={this.handleChange} />
                    </label>
                </div>
                <div className="center-div">
                    <button type="submit">Submit</button>
                </div>
                {this.state.greeting ? this.state.greeting : ''}
            </form>
        )
    }
}

export default GreetingPage
