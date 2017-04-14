import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ContactUs from './ContactUs';
import Home from './Home';
import Messaging from './Messaging';
import PlanTour from './PlanTour';
import Profile from './Profile';
import TouristUI from './TouristUI';

// Render application routes of tourist subsystem into {this.props.children} of TourMateUI
export default TouristApp = ({props, match}) => (
	<TouristUI>
		<Route path="/tourist/:username/contactus" component={ContactUs}/>
		<Route path="/tourist/:username/home" component={Home}/>
		<Route path="/tourist/:username/messaging" component={Messaging}/>
		<Route path="/tourist/:username/plantour" component={PlanTour}/>
		<Route path="/tourist/:username/profile" component={Profile}/>
	</TouristUI>
);