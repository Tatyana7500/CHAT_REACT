import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './main/Main.jsx';
import Login from './login/Login.jsx';
import Signin from './signin/Signin.jsx';

// ReactDOM.render(<Main/>, document.getElementById('root'));

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signin" component={Signin} />
        </Switch>
    </Router>,
    document.getElementById("root")
)