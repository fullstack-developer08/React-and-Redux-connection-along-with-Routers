import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }
    render() {
        return (
            <div>
                Todo List
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        todos: state.todos
    }
)

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);