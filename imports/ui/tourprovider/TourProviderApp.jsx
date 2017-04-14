import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from './Home';
import Messaging from './Messaging';
import Profile from './Profile';
import Reservations from './Reservations';
import Reviews from './Reviews';
import TourProviderUI from './TourProviderUI';

// Render application routes of tourist subsystem into {this.props.children} of TourMateUI
export default TourProviderApp = ({props, match}) => ( 
	<TourProviderUI>
		<Route path="/tourprovider/:username/home" component={Home}/>
		<Route path="/tourprovider/:username/messaging" component={Messaging}/>
		<Route path="/tourprovider/:username/profile" component={Profile}/>
		<Route path="/tourprovider/:username/reservations" component={Reservations}/>
		<Route path="/tourprovider/:username/reviews" component={Reviews}/>
	</TourProviderUI>
);