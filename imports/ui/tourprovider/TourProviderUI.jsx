import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home';
import {Nav, NavItem} from '../common/Components';

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
		return (
			<div>
				<h1>Welcome {this.props.currentUser.username}!</h1>
				<Nav>
					<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/"}>Home</NavItem>
					<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/profile"}>Profile</NavItem>
					<NavItem to={"/tour-provider/" + this.props.currentUserv.username + "/reservations"}>Reservations</NavItem>
					<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/messaging"}>Messaging</NavItem>
					<NavItem to={"/tour-provider/" + this.props.currentUser.username + "/reviews"}>Reviews</NavItem>
				</Nav>
				{/*UI Components render here*/}
				{this.props.children}
			</div>
		);
	}
}

// REACT-METEOR-DATA CONTAINER
TourProviderUI.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, TourProviderUI);