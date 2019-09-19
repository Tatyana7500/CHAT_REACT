import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/Main.jsx';
import Login from './login/Login.jsx';
import SignIn from './signIn/SignIn.jsx';


ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path='/main' component={Main} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signIn' component={SignIn} />
        </Switch>
    </Router>,
    document.getElementById('root')
);