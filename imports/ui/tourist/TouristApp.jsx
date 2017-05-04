import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Reservations from './Reservations';
import Home from './Home';
import Messaging from './Messaging';
import PlanTour from './PlanTour';
import Profile from './Profile';
import TouristUI from './TouristUI';

/* ------------------------------------------------------------ *
 * Application routes of tourist subsystem -------------------- *
 * ------------------------------------------------------------ */
export default TouristApp = ({props, match}) => (
	<div>
		<Route path="/tourist/:username" component={TouristUI}/>
		<Route exact path="/tourist/:username" component={Home}/>
		
		<Route path="/tourist/:username/reservations" component={Reservations}/>
		<Route path="/tourist/:username/messaging" component={Messaging}/>
		<Route path="/tourist/:username/plantour" component={PlanTour}/>
		<Route path="/tourist/:username/profile" component={Profile}/>
	</div>
);