import React, { Component } from 'react';
import { connect } from 'react-redux';

class Stuff extends Component {
    render(){
        return(
            <div>
                <h1>My Favorite Number: {this.props.favorite}</h1>
            </div>
        )
    }
}

function mapStateToProps({ counter }){
    return { favorite: counter.counter };
};

export default connect(mapStateToProps, null)(Stuff);