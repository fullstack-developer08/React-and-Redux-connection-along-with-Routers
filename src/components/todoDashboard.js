import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TodoDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Todo Dashboard Component
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
    return bindActionCreators(
        {

        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoDashboard);

