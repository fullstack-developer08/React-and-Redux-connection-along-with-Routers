import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var uuid = require('uuid');

export class UserLogin extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column">
                </div>
                <div className="column">
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">Login => Username: test, Password: test</p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                {
                                    this.props.loginMessage && this.props.loginMessage !== '' && (
                                        <article className="message is-danger">
                                            <div className="message-body">
                                                {this.props.loginMessage}
                                            </div>
                                        </article>
                                    )
                                }
                                <form onSubmit={this.props.onSubmit}>
                                    <div className="field">
                                        <label className="label">User Name</label>
                                        <div className="control">
                                            <input
                                                className={this.props.getState.usernameInputClass}
                                                type="text"
                                                name="username"
                                                placeholder="Enter User Name" />
                                        </div>
                                        {
                                            this.props.getState.usernameValidateErrors.length > 0 && this.props.getState.usernameValidateErrors.map(
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
                                                className={this.props.getState.passwordInputClass}
                                                type="text"
                                                name="password"
                                                placeholder="Enter Password" />
                                        </div>
                                        {
                                            this.props.getState.passwordValidateErrors.length > 0 && this.props.getState.passwordValidateErrors.map(
                                                (err) => (
                                                    <p className="help is-danger" key={uuid()}>{err}</p>
                                                )
                                            )
                                        }
                                    </div>
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button className="button is-link">Login</button>
                                        </div>
                                        <Link className="button is-info" to="user-register">
                                            Sign Up
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                </div>
            </div>
        )
    }
}