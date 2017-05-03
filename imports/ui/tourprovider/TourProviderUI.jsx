import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home';
import {Navbar, NavHeader, Nav, NavItem, CollapsingNav} from '../common/Components';

/* ------------------------------------------------------------ *
 * Application page for tour provider subsystem --------------- *
 * ------------------------------------------------------------ */
export class TourProviderUI extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		if(this.props.currentUser && this.props.username){
			if(this.props.currentUser.role != "tour-provider" || this.props.currentUser.username != this.props.username){
				this.props.history.push(this.props.currentUser ? '/' : '/login');
			}
		}
	}

	render(){
		if (!this.props.currentUser) return (<div><h1>Loading.. </h1></div>);
		return (
			<div>
				<Navbar>
					<Nav>
						<NavHeader to={"/tour-provider/" + this.props.currentUser.username} collapsetarget="tour-provider-nav">My Profile</NavHeader>
					</Nav>
					<CollapsingNav id="tour-provider-nav">
						<Nav>
							{/*<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/profile"}>Profile</NavItem>*/}
							<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/reservations"} collapsetarget="tour-provider-nav">Reservations</NavItem>
							<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/messaging"} collapsetarget="tour-provider-nav">Messaging</NavItem>
							<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/reviews"} collapsetarget="tour-provider-nav">Reviews</NavItem>
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
 * Reactive data container for TourProviderUI ----------------- *
 * ------------------------------------------------------------ */
export default TourProviderUIContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, TourProviderUI);