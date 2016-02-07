import React from 'react'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory, hashHistory  } from 'react-router'
import CreateHistory from 'history/lib/createHashHistory'


import APP from './components/APP.jsx'
import Audience from'./components/Audience.jsx'
import Speaker from './components/Speaker.jsx'
import Board from './components/Board.jsx'
import NotFound from './components/NotFound404.jsx'

var History = new CreateHistory({
  queryKey : false
});

var Routes = (
  <Router history={History} >
    <Route path='/' component={APP}>
        <IndexRoute component={Audience}/>
        <Route path="/Board" component={Board} />
        <Route path="/Speaker" component={Speaker} />
        <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

module.exports = Routes;
