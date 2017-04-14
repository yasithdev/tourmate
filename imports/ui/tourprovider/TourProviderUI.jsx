import { Meteor } from 'meteor/meteor';
import React from 'react';

import Home from './Home';
import {Nav, NavItem} from '../common/Components';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';


export default class TourProviderUI extends React.Component{
	
	constructor(props){
		super(props);
	}
    // before UI component is rendered, check if current user has privileges to access it.
    // if not, redirect to respective UI
	componentWillMount(){
		let isAuthenticated = false;
		let isLoggedIn = false;
		if(this.props.user != null){
			isLoggedIn = true;
            // confirm that the current user has the role "tourprovider"
			if(this.props.user.role == "tourprovider"){
				isAuthenticated = true;
				if(this.props.history != null) this.props.history.push("/tourprovider/" + this.props.user.username + "/home");
				return;
			}
		}
		if(!isAuthenticated){
			if(this.props.history != null) this.props.history.push(isLoggedIn? '/home' : '/login');
		}
	}

	render(){
		return (
			<div>
				<h1>Tour Provider UI</h1>
				{this.props.username}
				<Nav bsStyle="tabs" activeKey="1">
					<NavItem to={"/tourprovider/" + this.props.user.username + "/home"}>Home</NavItem>
					<NavItem to={"/tourprovider/" + this.props.user.username + "/profile"}>Profile</NavItem>
					<NavItem to={"/tourprovider/" + this.props.user.username + "/reservations"}>Reservations</NavItem>
					<NavItem to={"/tourprovider/" + this.props.user.username + "/messaging"}>Messaging</NavItem>
					<NavItem to={"/tourprovider/" + this.props.user.username + "/reviews"}>Reviews</NavItem>
				</Nav>
				{/*UI Components render here*/}
				{this.props.children}
			</div>
		);
	}

};