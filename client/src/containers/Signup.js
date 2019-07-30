import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signup } from './../actions';
import validator from 'validator';

class Signup extends Component {

    renderErrors = ({ error, touched }) => {
        if(touched && error) {
            return (
                <div>
                    <div>{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        console.log(input)
        return (
            <div>
                <label>{label}</label>
                <input autoComplete="off"/>
                {this.renderErrors(meta)}
            </div>
        )
    }

    onSubmit = formProps => {
        console.log(formProps);
        this.props.signup(formProps, () => {
            // props.history coming from react-router
            this.props.history.push('/counter');
        });
    }
    render() {
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        label="Email"
                        component={this.renderInput}
                        autoComplete="none"/>
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        label="password"
                        component={this.renderInput}
                        autoComplete="none"/>
                </fieldset>
                <button>Signup</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.errorMessage };
}

const validate = formValues => {
    const errors = {};
    console.log('validator', formValues);

    if(!formValues.email){
        errors.email = "You must enter an email";
    }
    if(!formValues.email){
        if(!validator.isEmail(formValues.email)){
            errors.email = "You must enter a valid email address";
        }
    }
    if(!formValues.password){
        errors.password = "You must enter a password";
    }
    return errors;
}

// Instead of the below:
// export default connect(mapStateToProps, null)(Signup);
// Redux lets us use:
export default compose(
    connect(mapStateToProps, { signup }),
    reduxForm({ 
        form: 'signup',
        validate 
    })
)(Signup)