import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Messaging from './Messaging';
import Profile from './Profile';
import Reservations from './Reservations';
import Reviews from './Reviews';
import TourProviderUI from './TourProviderUI';

/* ------------------------------------------------------------ *
 * Application routes of tour provider subsystem -------------- *
 * ------------------------------------------------------------ */
export default TourProviderApp = ({props, match}) => ( 
	<div>
		<Route path="/tour-provider/:username" component={TourProviderUI}/>
		<Route exact path="/tour-provider/:username" component={Home}/>
		
		<Route path="/tour-provider/:username/messaging" component={Messaging}/>
		<Route path="/tour-provider/:username/profile" component={Profile}/>
		<Route path="/tour-provider/:username/reservations" component={Reservations}/>
		<Route path="/tour-provider/:username/reviews" component={Reviews}/>
	</div>
);