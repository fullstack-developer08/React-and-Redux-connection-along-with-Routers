import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserLogin } from './userLogin';
import { validateUsername, validatePassword } from '../formValidators/userRegisterFormValidator';
import { getValue } from '../common/localStorage';
import { userLogin, getStateFromStorageForUser } from '../actions/actions';

class UserPanel extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            usernameValidateErrors: [],
            passwordValidateErrors: [],
            usernameInputClass: 'input',
            passwordInputClass: 'input',
            loginMessage: ''
        }
    }

    componentDidMount() {
        //on reload the page state should come from the local storage

        const persistedState = getValue('state');

        if (persistedState && persistedState.user) {
            this.props.getStateFromStorageForUser(persistedState.user);
        }

        // if user is already logged in than redirect to the todo page
        let tempUser = getValue('tempUser');
        if (this.props.user && tempUser && this.props.user.username === tempUser.username && this.props.user.password === tempUser.password) {
            this.props.history.push('/todos');
        }
    }

    onSubmit(e) {
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
        if (validateErrors.username.length > 0 || validateErrors.password.length > 0) {
            this.setState((prevState) => ({
                usernameValidateErrors: validateErrors.username,
                passwordValidateErrors: validateErrors.password,
                usernameInputClass: validateErrors.username.length > 0 ? 'input is-danger' : 'input',
                passwordInputClass: validateErrors.password.length > 0 ? 'input is-danger' : 'input',
            }))
        } else {
            const tempUser = getValue('tempUser');
            if (tempUser && tempUser.username === username && tempUser.password === password) {
                this.props.userLogin({ username, password });
                this.props.history.push('/todos');
                // if (!currentState.user.username) {
                //     setTimeout(() => {

                //     }, 1000)
                // } else {

                // }
            } else {
                this.setState((prevState) => ({
                    loginMessage: 'Please check your username and password!'
                }))
            }
        }

    }

    render() {
        return (
            <div className="container">
                <UserLogin onSubmit={this.onSubmit} getState={this.state} loginMessage={this.state.loginMessage} />
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
        userLogin,
        getStateFromStorageForUser
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);

