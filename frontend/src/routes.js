import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Login from './pages/Login/index';
import Dashboard from './pages/Dashboard/index';
import New from './pages/New/index';

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/new" component={New} />
			</Switch>
		</Router>
	);
}
