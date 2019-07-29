import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './../actions'
import requireAuth from '../hoc/requireAuth';

class Counter extends Component {

    render() {
        return (
            <div>
                <h1>Counter</h1>
                <p>Count: {this.props.counter}</p>
                <button onClick={this.props.incrementCounter}>Increment</button>
                <button onClick={this.props.decrementCounter}>Decrement</button>
            </div>
        )
    }
}
// *state* callback below could be replaced with (*{ counter }*) to take it down a level 
// and calls for removing the state in the counter call below it
function mapStateToProps({ counter }){
    return {
        counter: counter.counter
    }
}

// connect always takes in mapStateToProps
// wrapped this in require auth for authentication
export default requireAuth(connect(mapStateToProps, { incrementCounter, decrementCounter })(Counter));