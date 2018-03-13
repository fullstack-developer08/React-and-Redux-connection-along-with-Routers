import React, {Component} from 'react';
var uuid = require('uuid');

export class UserLogin extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
                <div className="columns">
                    <div className="column">
                    </div>
                    <div className="column">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">Login</p>
                            </header>
                            <div className="card-content">
                                <div className="content">
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
                                                this.props.getState.usernameValidateErrors.length > 0 &&this.props.getState.usernameValidateErrors.map(
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