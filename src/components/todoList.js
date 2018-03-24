import React, { Component } from 'react';
var uuid = require('uuid');

export default class TodoList extends Component {
    render() {
        return (
            this.props.visible && (
                <div className="columns">
                    <div className="column">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">Todo List</p>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Desc</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.todos.length > 0 && this.props.todos.map((todo) => (
                                                    <tr key={uuid()} >
                                                        <td>{todo.description}</td>
                                                        <td>{todo.priority}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
}
