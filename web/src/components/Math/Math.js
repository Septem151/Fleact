import React, { Component } from 'react';

export class Math extends Component {
    constructor(props) {
        super(props);

        this.state = {
            result: null
        };
    }

    componentDidMount() {
        this.updateResult();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.num1 !== this.props.num1
            || prevProps.num2 !== this.props.num2
            || prevProps.operation !== this.props.operation) {
            this.updateResult();
        }
    }

    updateResult() {
        if(!this.props.num1 || !this.props.num2) {
            return;
        }
        // Send POST request
        fetch('http://localhost:5000/math?num1=' + this.props.num1 + '&num2=' + this.props.num2 
            + '&op=' + this.props.operation, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
        })
                .then(response => response.json())
                .then(data => this.setState({result: data.equation}));
        // Send GET request
        // fetch('http://localhost:5000/greeting' + (this.props.name ? '?name=' + this.props.name : ''), {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json'
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => this.setState({ greeting: data.greeting }));
    }

    render() {
        const {result} = this.state;
        return (
            <div className="center-div mtop-2">
                {result}
            </div>
        )
    }
}

export default Math
