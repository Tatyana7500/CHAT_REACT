import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/Main.jsx';
import Login from './login/Login.jsx';
import SignIn from './signIn/SignIn.jsx';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signIn" component={SignIn} />
        </Switch>
    </Router>,
    document.getElementById("root")
);