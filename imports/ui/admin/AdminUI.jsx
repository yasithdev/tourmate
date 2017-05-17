import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home';
import {Navbar, NavHeader, Nav, NavItem, CollapsingNav} from '../common/Components';

/* ------------------------------------------------------------ *
 * Application page for admin subsystem ----------------------- *
 * ------------------------------------------------------------ */
export class AdminUI extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		if (!this.props.currentUser) return (<div><h1>Loading.. </h1></div>);
		return (
			<div>
				<Navbar>
					<Nav>
						<NavHeader to={"/admin/" + this.props.currentUser.username} collapsetarget="admin-nav">Administration</NavHeader>
					</Nav>
					<CollapsingNav id="admin-nav">
						<Nav>
							{/*<NavItem to={"/admin/" + this.props.currentUser.username + "/profile"}>Profile</NavItem>*/}
							<NavItem to={"/admin/" + this.props.currentUser.username + "/disputes"} collapsetarget="admin-nav">Disputes</NavItem>
							<NavItem to={"/admin/" + this.props.currentUser.username + "/messaging"} collapsetarget="admin-nav">Messaging</NavItem>
						</Nav>
					</CollapsingNav>
				</Navbar>
				<div className="container">
					{/*UI Components render here*/}
					{this.props.children}
				</div>
			</div>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for AdminUI ----------------- *
 * ------------------------------------------------------------ */
export default AdminUIContainer = createContainer(function(props) {
  return {
    currentUser: Meteor.user(),
  };
}, AdminUI);