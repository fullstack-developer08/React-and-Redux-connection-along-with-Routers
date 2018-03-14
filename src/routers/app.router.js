import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserPanel from '../components/userPanel';
import TodoDashboard from '../components/todoDashboard';
import UserRegister from '../components/userRegister';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const AppRouter = (props) => (
    <BrowserRouter>
        <div>
            <Header /><br /><br />
            <Switch>
                <Route exact path="/" component={UserPanel} />
                <Route path="/user-register" component={UserRegister} />
                <Route path="/todos" component={TodoDashboard} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)
