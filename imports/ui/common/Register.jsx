import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Form, FormInput, FormCheckbox, FormButton, FormRadioButtons } from './Components';

export default class Register extends React.Component
{
	constructor(props){
		super(props);
		this.state = {'registered' : false};
	}

	componentWillMount(){
		// Redirect to login page once registration completed with no errors
    if(this.state.registered) this.props.history.push('/login');
	}

	handleSubmit(event){
		event.preventDefault();
		let r = ReactDOM.findDOMNode(this.refs.inputRole.refs.selection).value;
		let u = ReactDOM.findDOMNode(this.refs.inputUsername.refs.input).value;
		let p = ReactDOM.findDOMNode(this.refs.inputPassword.refs.input).value;
		let e = ReactDOM.findDOMNode(this.refs.inputEmail.refs.input).value;
		let a = ReactDOM.findDOMNode(this.refs.inputAccepted.refs.checked).value;

		// generate user parameters object from updated state variables
		let credentials = {username: u, profile: {role: r,}, password: p, email: e,};

		// Invoke server method to add new user, and pass user parameters
		Meteor.call("addUser", credentials, (error, result) => {
			// Show success message when insert completed
			console.log(credentials, error, result);
			// Mark state as registered if no errors occured
			if(result) this.state.registered = true;
		});
	}

	handleUsernameChanged(event){
		const uname = event.target.value;
		this.state.username =  uname;
		Meteor.call('checkIsUsernameAvailable', uname, function(error, result){
			// Update the help text of the username input with availability of username
			ReactDOM.findDOMNode(this.refs.inputUsername.refs.helptext).value = result ? 'Available' : 'Already Taken';
		});
	}

	render(){
		return(
		<div>
			<h1>Register UI</h1>
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<FormRadioButtons ref='inputRole' buttons={['Tourist', 'TourProvider']}/>
				<FormInput type='text' placeholder='User Name' ref='inputUsername' onChanged={this.handleUsernameChanged.bind(this)}/>
				<FormInput type='password' placeholder='Password' ref='inputPassword'/>
				<FormInput type='email' placeholder='Email' ref='inputEmail'/>
				<FormCheckbox text='I agree to the terms and conditions of TourMate' ref='inputAccepted'/>
				<FormButton text='Register'/>
			</Form>
		</div>
		);
	}
};