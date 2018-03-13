import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {UserLogin} from './userLogin';
import {validateUsername, validatePassword} from '../formValidators/userRegisterFormValidator';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            usernameValidateErrors:[],
            passwordValidateErrors:[],
            usernameInputClass: 'input',
            passwordInputClass: 'input'
        }
    }

    componentDidMount() {

    }

    onSubmit(e){
            e.preventDefault();
            this.setState((prevState) => ({
                usernameValidateErrors: [],
                passwordValidateErrors: [],
                usernameInputClass: 'input',
                passwordInputClass: 'input',
            }))
            let username = e.target.elements.username.value;
            let password = e.target.elements.password.value;
            validateUsername(username);
            const validateErrors = validatePassword(password);
            if(validateErrors.username.length > 0 || validateErrors.password.length > 0){
                this.setState((prevState) => ({
                    usernameValidateErrors: validateErrors.username,
                    passwordValidateErrors: validateErrors.password,
                    usernameInputClass: validateErrors.username.length > 0 ? 'input is-danger' : 'input',
                    passwordInputClass: validateErrors.password.length > 0 ? 'input is-danger' : 'input',
                }))
            } else {
                
            }

    }

    render() {
        return (
            <div className="container">
                <UserLogin onSubmit={this.onSubmit} getState={this.state}/>
            </div>
        )
    }
}

//it gives the updated state on every updation
const mapStateToProps = (state) => ({
    user: state.user
})


// need to pass app the actions to access from props so that on action call component will update
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);

