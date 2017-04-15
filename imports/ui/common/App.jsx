import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Nav, NavItem } from './Components';
import TouristApp from '../tourist/TouristApp';
import TourProviderApp from '../tourprovider/TourProviderApp';

export class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="container-fluid">
				<h1>TourMate</h1>
				<p>A platform to connect tourists and tour providers</p>
				{/*{Navigation bar}*/}
				<Nav activeKey="1">
					<NavItem to="/">Home</NavItem>
					{this.props.currentUser 
						? <NavItem to={"/" + this.props.currentUser.profile.role +"/"+ this.props.currentUser.username}>{this.props.currentUser.profile.role }</NavItem> 
						: ''
					}
					{this.props.currentUser 
						? '' 
						: <NavItem to="/register">Register</NavItem>
					}
					<NavItem to="/about">About Us</NavItem>
					{this.props.currentUser
						? <NavItem to="/logout">Logout</NavItem> 
						: <NavItem to="/login">Login</NavItem>
					}
				</Nav>
				{/*UI Components render here*/}
				{this.props.children}
			</div>
		);
	}
};

// REACT-METEOR-DATA CONTAINER
App.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, App);