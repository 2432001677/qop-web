import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

// core components
import Admin from 'layouts/Admin.js';
import Login from 'views/Login/Login.js';
import Register from 'views/Register/Register.js';

import 'assets/css/material-dashboard-react.css?v=1.9.0';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
