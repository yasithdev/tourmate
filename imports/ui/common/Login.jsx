import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Jumbotron, Form, FormInput, FormButton } from './Components'

export class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {'isLoggedIn' : false};
	}

	componentDidMount(){
		if(this.state.isLoggedIn){
			this.props.history.push("/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username + "/");
		}
	}

	render() {
		if(this.state.isLoggedIn) {
			return (<div className="jumbotron text-center">Successfully Logged In. Redirecting..</div>);
		}
		else return(
		<div>
			<h1>Log in to your Account</h1>
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<FormInput type='text' ref='inputUsername' placeholder='User Name'/>
				<FormInput type='password' ref='inputPassword' placeholder='Password'/>
				<FormButton text='Log in'/>
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
				this.setState({'isLoggedIn' : true});
			}
		});
	}
}

export default LoginContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, Login);