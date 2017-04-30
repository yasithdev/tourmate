import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, IndexRoute, Route, Link } from 'react-router-dom';

import '../imports/startup/accounts-config.js'; 

import App from '../imports/ui/common/App';
import About from '../imports/ui/common/About';
import Home from '../imports/ui/common/Home';
import Login from '../imports/ui/common/Login';
import Logout from '../imports/ui/common/Logout';
import Register from '../imports/ui/common/Register';

Meteor.startup(() => {
	// Render application routes into content in main.html
	ReactDOM.render((
			<Router>
				<div>
					<Route path="/" component={App}/>
					{/*Child Conponents*/}
					<Route exact path="/" component={Home}/>
					<Route path="/about" component={About}/>
					<Route path="/login" component={Login}/>
					<Route path="/logout" component={Logout}/>
					<Route path="/register" component={Register}/>
					<Route path="/tourist/:username" component={TouristApp}/>
					<Route path="/tour-provider/:username" component={TourProviderApp}/>
				</div>
			</Router>
	), document.getElementById('render-target'));
});