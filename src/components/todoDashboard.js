import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getValue } from '../common/localStorage';
import { getStateFromStorateForTodo, getStateFromStorageForUser, addTodo } from '../actions/actions';
import { validateTodo, validatePriority } from '../formValidators/todoFormValidator';
import TodoList from './todoList';
var uuid = require('uuid');

class TodoDashboard extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            prioritySelectClassName: 'select',
            todoInputClassName: 'input',
            priorityValidateErrors: [],
            todoValidateErrors: [],
            isTodoListVisible: false
        };
    }

    componentDidMount() {
        //on reload the page state should come from the local storage

        const persistedState = getValue('state');

        if (persistedState && persistedState.todos) {
            this.props.getStateFromStorateForTodo(persistedState.todos);
        }

        if (persistedState && persistedState.user) {
            this.props.getStateFromStorageForUser(persistedState.user);
        }

        let tempUser = getValue('tempUser');
        if (!this.props.user) {
            this.props.history.push('/');
        }
        if (this.props.user && tempUser) {
            if (this.props.user.username !== tempUser.username || this.props.user.password !== tempUser.password) {
                this.props.history.push('/');
            }
        }

        // check wether list is avaialable or not
        setTimeout(() => {
            if (this.props.todos.todos.length > 0) {
                this.setState((prevState) => ({
                    isTodoListVisible: true
                }))
            }
        }, 1000)




    }

    onSubmit(e) {
        //stops default behaviours for form submit
        //stops form submit
        e.preventDefault();

        //getting the value from the fields
        const todo = e.target.elements.todo.value;
        const priority = e.target.elements.priority.value;

        //validation for form fields
        validateTodo(todo);
        const validateErrors = validatePriority(priority);

        //before submit form state should be default state so that new error will be visible
        this.setState((prevState) => ({
            prioritySelectClassName: 'select',
            todoInputClassName: 'input',
            priorityValidateErrors: [],
            todoValidateErrors: []
        }))

        //if validate errors comes then show the errors
        if (validateErrors.todo.length > 0 || validateErrors.priority.length > 0) {
            this.setState((prevState) => ({
                prioritySelectClassName: validateErrors.priority.length > 0 ? 'select is-danger' : 'select',
                todoInputClassName: validateErrors.todo.length > 0 ? 'input is-danger' : 'input',
                priorityValidateErrors: validateErrors.priority,
                todoValidateErrors: validateErrors.todo
            }))
        } else {
            //If no validation errors found
            this.props.addTodo({ todo, priority });
        }

    }

    render() {
        return (
            <div className="container">
                <div className="columns">
                    <div className="column">
                    </div>
                    <div className="column">
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title">Add Todo</p>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="field">
                                            <label className="label">Description</label>
                                            <div className="control">
                                                <input
                                                    className={this.state.todoInputClassName}
                                                    type="text"
                                                    name="todo"
                                                    placeholder="Enter Todo"
                                                />
                                            </div>
                                            {
                                                this.state.todoValidateErrors.length > 0 && this.state.todoValidateErrors.map(
                                                    (err) => (
                                                        <p className="help is-danger" key={uuid()}>{err}</p>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="field">
                                            <label className="label">Priority</label>
                                            <div className="control">
                                                <div className={this.state.prioritySelectClassName}>
                                                    <select name="priority">
                                                        <option value=''>Select Priority</option>
                                                        <option value='High'>High</option>
                                                        <option value='Medium'>Medium</option>
                                                        <option value='Low'>Low</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {
                                                this.state.priorityValidateErrors.length > 0 && this.state.priorityValidateErrors.map(
                                                    (err) => (
                                                        <p className="help is-danger" key={uuid()}>{err}</p>
                                                    )
                                                )
                                            }
                                        </div>
                                        <div className="field is-grouped">
                                            <div className="control">
                                                <button className="button is-link">ADD TODO</button>
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
                <TodoList visible={this.state.isTodoListVisible} todos={this.props.todos.todos} />
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        user: state.user,
        todos: state.todos
    }
)

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getStateFromStorateForTodo,
            getStateFromStorageForUser,
            addTodo
        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDashboard);

