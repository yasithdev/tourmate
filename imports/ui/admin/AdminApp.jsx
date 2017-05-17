import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Messaging from './Messaging';
import Disputes from './Disputes';
import AdminUI from './AdminUI';

/* ------------------------------------------------------------ *
 * Application routes of tour provider subsystem -------------- *
 * ------------------------------------------------------------ */
export default AdminApp = ({props, match}) => ( 
	<div>
		<Route path="/admin/:username" component={AdminUI}/>		
		<Route exact path="/admin/:username" component={Home}/>
		
		<Route path="/admin/:username/messaging" component={Messaging}/>
		<Route path="/admin/:username/disputes" component={Disputes}/>
	</div>
);