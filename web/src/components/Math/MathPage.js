import React, { Component } from 'react';
import Math from './Math';
import './Math.css';

export class MathPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            num1: '',
            num2: '',
            math: null
        };

        this.handleNum1Change = this.handleNum1Change.bind(this);
        this.handleNum2Change = this.handleNum2Change.bind(this);
        this.handleOperationSelect = this.handleOperationSelect.bind(this);
    }

    handleNum1Change(event) {
        this.setState({
            num1: event.target.value.trim()
        });
    }

    handleNum2Change(event) {
        this.setState({
            num2: event.target.value.trim()
        })
    }

    handleOperationSelect(event) {
        event.preventDefault();
        this.setState({
            math: <Math num1={this.state.num1} num2={this.state.num2} operation={event.target.id} />
        })
    }

    render() {
        return (
            <div>
                <div className="center-div">
                    <label>
                        Number 1:
                    <input type="text" onChange={this.handleNum1Change}></input>
                    </label>
                </div>
                <div className="center-div">
                    <label>
                        Number 2:
                <input type="text" onChange={this.handleNum2Change}></input>
                    </label>
                </div>
                <div className="btn-container mtop-1">
                    <button id="addition" onClick={this.handleOperationSelect}>Add</button>
                    <button id="subtraction" onClick={this.handleOperationSelect}>Subtract</button>
                    <button id="multiplication" onClick={this.handleOperationSelect}>Multiply</button>
                    <button id="division" onClick={this.handleOperationSelect}>Divide</button>
                    <button id="exponent" onClick={this.handleOperationSelect}>Power</button>
                </div>
                {(this.state.math) ? this.state.math : ''}
            </div>
        );
    }
}

export default MathPage
