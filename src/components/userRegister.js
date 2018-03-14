import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setValue } from '../common/localStorage';
import { validateUsername, validatePassword, validateEmail } from '../formValidators/userRegisterFormValidator';
import { Link } from 'react-router-dom';
var uuid = require('uuid');

class UserRegister extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.state = {
            username: '',
            password: '',
            email: '',
            usernameInputClass: 'input',
            passwordInputClass: 'input',
            emailInputClass: 'input',
            usernameValidateErrors: [],
            passwordValidateErrors: [],
            emailValidateErrors: [],
            registerMessage: ''
        }
    }

    componentDidMount() {

    }

    onChangeInput(e) {
        const value = e.target.value;
        const name = e.target.name;
        if (name === 'username') {
            this.setState((prevState) => ({
                username: value
            }))
        }
        if (name === 'password') {
            this.setState((prevState) => ({
                password: value
            }))
        }
        if (name === 'email') {
            this.setState((prevState) => ({
                email: value
            }))
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState((prevState) => ({
            usernameValidateErrors: [],
            passwordValidateErrors: [],
            emailValidateErrors: [],
            usernameInputClass: 'input',
            passwordInputClass: 'input',
            emailInputClass: 'input',
        }))
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const email = e.target.elements.email.value;

        validateUsername(username);
        validatePassword(password);
        const validateErrors = validateEmail(email);
        if (validateErrors.username.length > 0 || validateErrors.password.length > 0 || validateErrors.email.length > 0) {
            console.log(validateErrors);
            this.setState((prevState) => ({
                usernameValidateErrors: validateErrors.username,
                passwordValidateErrors: validateErrors.password,
                emailValidateErrors: validateErrors.email,
                usernameInputClass: validateErrors.username.length > 0 ? 'input is-danger' : 'input',
                passwordInputClass: validateErrors.password.length > 0 ? 'input is-danger' : 'input',
                emailInputClass: validateErrors.email.length > 0 ? 'input is-danger' : 'input',
                registerMessage: ''
            }))
        } else {
            setValue('tempUser', { username, password, email });
            this.setState((prevState) => ({
                username: '',
                password: '',
                email: '',
                usernameInputClass: validateErrors.username.length > 0 ? 'input is-danger' : 'input',
                passwordInputClass: validateErrors.password.length > 0 ? 'input is-danger' : 'input',
                emailInputClass: validateErrors.email.length > 0 ? 'input is-danger' : 'input',
                registerMessage: 'You are register successfully!'
            }))
        }
    }

    render() {
        return (
            <div>
                <div className="columns">
                    <div className="column">
                    </div>
                    <div className="column">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">Register</p>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    {
                                        this.state.registerMessage !== '' && (
                                            <article className="message is-success">
                                                <div className="message-body">
                                                    {this.state.registerMessage}
                                                </div>
                                            </article>
                                        )
                                    }
                                    <form onSubmit={this.onSubmit}>
                                        <div className="field">
                                            <label className="label">User Name</label>
                                            <div className="control">
                                                <input
                                                    className={this.state.usernameInputClass}
                                                    type="text"
                                                    name="username"
                                                    value={this.state.username}
                                                    placeholder="Enter User Name"
                                                    onChange={this.onChangeInput}
                                                />
                                            </div>
                                            {
                                                this.state.usernameValidateErrors.length > 0 && this.state.usernameValidateErrors.map(
                                                    (err) => (
                                                        <p className="help is-danger" key={uuid()}>{err}</p>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control">
                                                <input
                                                    className={this.state.passwordInputClass}
                                                    type="text"
                                                    name="password"
                                                    value={this.state.password}
                                                    placeholder="Enter email"
                                                    onChange={this.onChangeInput}
                                                />
                                            </div>
                                            {
                                                this.state.passwordValidateErrors.length > 0 && this.state.passwordValidateErrors.map(
                                                    (err) => (
                                                        <p className="help is-danger" key={uuid()}>{err}</p>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input
                                                    className={this.state.emailInputClass}
                                                    type="text"
                                                    name="email"
                                                    value={this.state.email}
                                                    placeholder="Enter Password"
                                                    onChange={this.onChangeInput}
                                                />
                                            </div>
                                            {
                                                this.state.emailValidateErrors.length > 0 && this.state.emailValidateErrors.map(
                                                    (err) => (
                                                        <p className="help is-danger" key={uuid()}>{err}</p>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="field is-grouped">
                                            <div className="control">
                                                <button className="button is-link">Register</button>
                                            </div>
                                            <Link className="button is-info" to="/">Login</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);