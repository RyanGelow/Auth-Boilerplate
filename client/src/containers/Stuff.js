import React, { Component } from 'react';

class Stuff extends Component {
    state = {
        myFavoriteNumber: 7
    }

    handleIncrement = () => {
        this.setState({ myFavoriteNumber: this.state.myFavoriteNumber + 1 })
    }

    handleDecrement = () => {
        this.setState({ myFavoriteNumber: this.state.myFavoriteNumber - 1 })
    }

    render(){
        return(
            <div>
                <h1>My Favorite Number: {this.state.myFavoriteNumber}</h1>
                <button onClick={this.handleIncrement}>Up</button>
                <button onClick={this.handleDecrement}>Down</button>
            </div>
        )
    }
}

export default Stuff;