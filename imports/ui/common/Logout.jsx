import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Jumbotron, Form, FormInput, FormButton } from './Components'

export default class Logout extends React.Component {
	constructor(props){
		super(props);
	}
		
	render() {
		// Text to display while logging out
		return (<Jumbotron>Logging out..</Jumbotron>);
	}

	componentDidMount(){
		// Logout and redirect to login page
		Meteor.logout(() => {this.props.history.push('/login');});
	}
}