import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Form, FormInput, FormCheckbox, FormButton, FormRadioButtons } from './Components';

export class Register extends React.Component
{
	constructor(props){
		super(props);
		this.state = {'available' : ''};
	}

	componentWillMount(){
		// Redirect to login page once registration completed with no errors
    if(this.props.currentUser) this.props.history.push('/login');
	}

	handleSubmit(event){
		event.preventDefault();
		let r = this.refs.inputRole.state.value;
		let u = this.refs.inputUsername.refs.input.value;
		let p = this.refs.inputPassword.refs.input.value;
		let e = this.refs.inputEmail.refs.input.value;
		let a = this.refs.inputAccepted.refs.checked.value;

		// generate user parameters object from updated state variables
		let credentials = {username: u, profile: {role: r,}, password: p, email: e,};

		// Invoke server method to add new user, and pass user parameters
		Meteor.call("users.createUser", credentials, (error, result) => {
			// Show success message when insert completed
			console.log(credentials, error, result);
			// Redirect to login page if registration successful
			if(result) this.props.history.push('/login');
		});
	}

	handleUsernameChange(event){
		const uname = event.target.value;
		this.setState({available: this.props.isAvailable(uname)});
	}

	render(){
		return(
		<div>
			<h1>Register UI</h1>
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<FormRadioButtons ref='inputRole' buttons={['tourist', 'tour-provider']}/>
				<FormInput type='text' placeholder='User Name' ref='inputUsername' tip={this.state.available == true ? 'Available' : this.state.available === false ? 'Already taken' : ''} onChange={this.handleUsernameChange.bind(this)}/>
				<FormInput type='password' placeholder='Password' ref='inputPassword'/>
				<FormInput type='email' placeholder='Email' ref='inputEmail'/>
				<FormCheckbox text='I agree to the terms and conditions of TourMate' ref='inputAccepted'/>
				<FormButton text='Register'/>
			</Form>
		</div>
		);
	}
};
 
export default RegisterContainer = createContainer((props) => {
  return {
  	currentUser: Meteor.user(),
    isAvailable: (username) => (username ? !(Meteor.users.findOne({'username' : username})) : ''),
  };
}, Register);
