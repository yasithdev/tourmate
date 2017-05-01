import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Navbar, NavHeader, Nav, NavItem, CollapsingNav } from './Components';
import TouristApp from '../tourist/TouristApp';
import TourProviderApp from '../tourprovider/TourProviderApp';

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
								? <NavItem to={"/" + this.props.currentUser.profile.role +"/"+ this.props.currentUser.username}>{this.props.currentUser.profile.role }</NavItem> 
								: ''
							}
							<NavItem to="/about">About Us</NavItem>
						</Nav>
						<Nav align="right">
							{this.props.currentUser 
								? '' 
								: <NavItem to="/register">Register</NavItem>
							}
							{this.props.currentUser 
								? <a className="navbar-brand">{this.props.currentUser.profile.name}</a>
								: ''
							}
							{this.props.currentUser
								? <NavItem to="/logout">Logout</NavItem> 
								: <NavItem to="/login">Login</NavItem>
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

export default AppContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, App);