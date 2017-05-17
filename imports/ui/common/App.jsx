import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Navbar, NavHeader, Nav, NavItem, CollapsingNav } from './Components';
import TouristApp from '../tourist/TouristApp';
import TourProviderApp from '../tourprovider/TourProviderApp';
import AdminApp from '../admin/AdminApp';

export class App extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				{/*Navigation bar*/}
				<Navbar>
					<Nav activeKey="1" align="left">
						<NavHeader to="/" collapsetarget="main-nav">TourMate</NavHeader>
					</Nav>
					<CollapsingNav id="main-nav">
						<Nav>
							{this.props.currentUser 
								? <NavItem to={"/" + this.props.currentUser.profile.role +"/"+ this.props.currentUser.username} collapsetarget="main-nav">
										{this.props.currentUser.profile.role == "tourist" ? "Tourist" : this.props.currentUser.profile.role == "tour-provider" ? "Tour Provider" : "Admin"}
									</NavItem> 
								: ''
							}
							<NavItem to="/about" collapsetarget="main-nav">About Us</NavItem>
						</Nav>
						<Nav align="right">
							{this.props.currentUser 
								? '' 
								: <NavItem to="/register" collapsetarget="main-nav">Register</NavItem>
							}
							{this.props.currentUser 
								? <a className="navbar-brand">{this.props.currentUser.profile.name + " (" + this.props.currentUser.profile.role + ")"}</a>
								: ''
							}
							{this.props.currentUser
								? <NavItem to="/logout" collapsetarget="main-nav">Logout</NavItem> 
								: <NavItem to="/login" collapsetarget="main-nav">Login</NavItem>
							}
						</Nav>
					</CollapsingNav>
				</Navbar>
				{/*App components*/}
				{this.props.children}
			</div>
		);
	}
};

export default AppContainer = createContainer(function(props) {
  return {
    currentUser: Meteor.user(),
  };
}, App);