import React, { Component } from 'react';
import Time from './Time';
import './Time.css';

export class TimePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshToggle: false,
            zone: '',
            time: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ zone: event.target.value.trim() });
    }

    handleSubmit(event) {
        this.setState({ refreshToggle: !this.state.refreshToggle });
        if (this.state.zone) {
            this.setState({
                time: <Time zone={this.state.zone} refreshToggle={this.state.refreshToggle} />
            });
        } else {
            this.setState({
                time: <Time refreshToggle={this.state.refreshToggle} />
            })
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="center-div">
                    <label>
                        Timezone:
                    <input type="text" value={this.state.zone} onChange={this.handleChange} />
                    </label>
                </div>
                <div className="center-div">
                    <button type="submit">Submit</button>
                </div>
                {this.state.time ? this.state.time : ''}
            </form>
        )
    }
}

export default TimePage
