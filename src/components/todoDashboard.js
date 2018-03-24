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
        this.onChangeBindValue = this.onChangeBindValue.bind(this);
        this.state = {
            descriptionDefaultValue: '',
            priorityDefaultValueSelected: false,
            prioritySelectClassName: 'select',
            todoInputClassName: 'input',
            priorityValidateErrors: [],
            todoValidateErrors: [],
            isTodoListVisible: false
        };
    }



    async componentDidMount() {
        //on reload the page state should come from the local storage

        const persistedState = getValue('state');

        if (persistedState && persistedState.todos) {
            await this.props.getStateFromStorateForTodo(persistedState.todos);
        }

        if (persistedState && persistedState.user) {
            await this.props.getStateFromStorageForUser(persistedState.user);
        }

        let tempUser = getValue('tempUser');
        if (!tempUser) {
            this.props.history.push('/');
        }
        if (this.props.user && tempUser) {
            if (this.props.user.username !== tempUser.username || this.props.user.password !== tempUser.password) {
                this.props.history.push('/');
            }
        }
        if (this.props.todos.todos.length > 0) {
            this.setState((prevState) => ({
                isTodoListVisible: true
            }))
        }
    }

    async onSubmit(e) {
        //stops default behaviours for form submit
        //stops form submit
        e.preventDefault();

        //getting the value from the fields
        const description = e.target.elements.description.value;
        const priority = e.target.elements.priority.value;

        //validation for form fields
        validateTodo(description);
        const validateErrors = validatePriority(priority);

        //before submit form state should be default state so that new error will be visible
        this.setState((prevState) => ({
            prioritySelectClassName: 'select',
            todoInputClassName: 'input',
            priorityValidateErrors: [],
            todoValidateErrors: []
        }))

        //if validate errors comes then show the errors
        if (validateErrors.description.length > 0 || validateErrors.priority.length > 0) {
            this.setState((prevState) => ({
                prioritySelectClassName: validateErrors.priority.length > 0 ? 'select is-danger' : 'select',
                todoInputClassName: validateErrors.description.length > 0 ? 'input is-danger' : 'input',
                priorityValidateErrors: validateErrors.priority,
                todoValidateErrors: validateErrors.description
            }))
        } else {
            this.setState((prevState) => ({
                descriptionDefaultValue: '',
                priorityDefaultValueSelected: true
            }))
            //If no validation errors found
            await this.props.addTodo({ description, priority });
            if (this.props.todos.todos.length > 0) {
                this.setState((prevState) => ({
                    isTodoListVisible: true
                }))
            }
        }
    }

    onChangeBindValue(e) {
        let value = e.target.value;
        let name = e.target.name;
        if (name === 'description') {
            this.setState((prevState) => ({
                descriptionDefaultValue: value
            }))
        }
        if (name === 'priority') {
            this.setState((prevState) => ({
                priorityDefaultValueSelected: false
            }))
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
                                                    name="description"
                                                    placeholder="Enter Todo"
                                                    value={this.state.descriptionDefaultValue}
                                                    onChange={this.onChangeBindValue}
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
                                                    <select name="priority" onChange={this.onChangeBindValue}>
                                                        <option value='' selected={this.state.priorityDefaultValueSelected}>Select Priority</option>
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
                <TodoList visible={this.state.isTodoListVisible} todos={this.props.todos.todos} updateTaskStatus={this.updateTaskStatus} />
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

