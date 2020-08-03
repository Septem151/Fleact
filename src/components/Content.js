import React, { Component } from 'react';
import GreetingPage from './Greeting/GreetingPage';
import TimePage from './Time/TimePage';
import MathPage from './Math/MathPage';

export class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: null
        }

        this.onPageButtonClicked = this.onPageButtonClicked.bind(this);
    }

    onPageButtonClicked(event) {
        switch (event.target.id) {
            case "greeting":
                this.setState({ page: <GreetingPage /> });
                break;
            case "time":
                this.setState({ page: <TimePage /> });
                break;
            case "math":
                this.setState({ page: <MathPage /> });
                break;
            default:
                this.page = null;
        }
    }

    render() {
        return (
            <div className="content-container">
                <div className="btn-container">
                    <button id="greeting" className="btn" onClick={this.onPageButtonClicked}>Greeting</button>
                    <button id="time" className="btn" onClick={this.onPageButtonClicked}>Current Time</button>
                    <button id="math" className="btn" onClick={this.onPageButtonClicked}>Mathematics</button>
                </div>
                {this.state.page ? this.state.page : ''}
            </div>
        )
    }
}

export default Content
