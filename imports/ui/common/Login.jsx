import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Jumbotron, Form, FormInput, FormButton } from './Components'

export class Login extends React.Component {
	constructor(props){
		super(props);
	}

	componentWillMount(){
		// If a user has already logged in, redirect to their home page
		if(this.props.currentUser){
			if(this.props.currentUser.profile.role){
				this.props.history.push("/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username + "/home");
			}
		}
	}

	componentWillUpdate(){
		// If a user has already logged in, redirect to their home page
		if(this.props.currentUser){
			if(this.props.currentUser.profile.role){
				this.props.history.push("/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username + "/home");
			}
		}
	}

	render() {
		return(
		<div>
			<h1>Login UI</h1>
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<FormInput type='text' ref='inputUsername' placeholder='User Name'/>
				<FormInput type='password' ref='inputPassword' placeholder='Password'/>
				<FormButton text='Login'/>
			</Form>
		</div>
		);
	}

	handleSubmit(event){
		event.preventDefault();
		let username = this.refs.inputUsername.refs.input.value;
		let password = this.refs.inputPassword.refs.input.value;
		
		// Login
		Meteor.loginWithPassword(username, password, (error) => {
			console.log(username, password, error);
			if(!error) {
				// Show message that could not be logged in
			}
		});
	}
}

// REACT-METEOR-DATA CONTAINER
Login.propTypes = {
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  return {
    currentUser: Meteor.user(),
  };
}, Login);