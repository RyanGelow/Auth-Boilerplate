import React, { Component } from 'react';
import { connect } from 'react-redux';
import { incrementCounter, decrementCounter } from './../actions'

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
// *state* passthrough below could be replaced with (*{ counter }*) to take it down a level 
// and calls for removing the state in the counter call below it
function mapStateToProps(state){
    return {
        counter: state.counter.counter
    }
}

// connect always takes in mapStateToProps
export default connect(mapStateToProps, { incrementCounter, decrementCounter })(Counter);