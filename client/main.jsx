import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../imports/startup/accounts-config.js'; 

import {TourMateUI} from '../imports/ui/common/TourMateUI.jsx';
import About from '../imports/ui/common/About.jsx';
import Home from '../imports/ui/common/Home';
import {Login, Logout} from '../imports/ui/common/Login';
import Register from '../imports/ui/common/Register';

Meteor.startup(() => {
	// Render application routes into content in main.html
	ReactDOM.render((
		<Router>
			<TourMateUI>
				<Route exact path="/" component={Home}/>
				<Route path="/home" component={Home}/>
				<Route path="/about" component={About}/>
				<Route path="/login" component={Login}/>
				<Route path="/logout" component={Logout}/>
				<Route path="/register" component={Register}/>
				<Route path="/tourist/:username" component={TouristApp}/>
				<Route path="/tourprovider/:username" component={TourProviderApp}/>
			</TourMateUI>
		</Router>
	), document.getElementById('render-target'));
});