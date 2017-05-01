import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Home from './Home';
import {Navbar, NavHeader, Nav, NavItem, CollapsingNav} from '../common/Components';

export class TouristUI extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		if(this.props.currentUser && this.props.username){
			if(this.props.currentUser.role != "tourist" || this.props.currentUser.username != this.props.username){
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
						<NavHeader to={"/tourist/" + this.props.currentUser.username} collapsetarget="tourist-nav">My Profile</NavHeader>
					</Nav>
					<CollapsingNav id="tourist-nav">
						<Nav>
							{/*<NavItem to={"/tourist/" + this.props.currentUser.username + "/profile"}>Profile</NavItem>*/}
							<NavItem to={"/tourist/" + this.props.currentUser.username + "/plantour"} collapsetarget="tourist-nav">Plan a Tour</NavItem>
							<NavItem to={"/tourist/" + this.props.currentUser.username + "/messaging"} collapsetarget="tourist-nav">Messaging</NavItem>
							<NavItem to={"/tourist/" + this.props.currentUser.username + "/contact"} collapsetarget="tourist-nav">Contact</NavItem>
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

export default TouristUIContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, TouristUI);