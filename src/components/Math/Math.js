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
        fetch('/api/math?num1=' + encodeURIComponent(this.props.num1) 
            + '&num2=' + encodeURIComponent(this.props.num2) 
            + '&op=' + encodeURIComponent(this.props.operation), {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
        })
                .then(response => response.json())
                .then(data => {
                    if('equation' in data)
                        this.setState({result: data.equation});
                    else
                        this.setState({result: "Not a valid equation."});
                });
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
