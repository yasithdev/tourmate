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
		this.state = {'available' : '', 'agreed' : false};
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
		if(uname == '' || uname == null || uname == undefined) {
			this.setState({'available' : ""});
		}
		else {
			Meteor.call("users.username.isAvailable", uname, (error, result) => {
				this.setState({'available': result});
			});
		}
	}

	handleCheckChange(event){
		const agreed = (event.target.checked == true);
		this.setState({'agreed' : agreed});
	}

	render(){
		return(
			<Form onSubmit={this.handleSubmit.bind(this)} title="Registration">
				<FormRadioButtons placeholder="Account Type" ref='inputRole' buttons={{'tourist' : 'Tourist', 'tour-provider' : 'Tour Provider'}} selection="tourist"/>
				<FormInput type='text' placeholder='User Name' minlength='8' ref='inputUsername' tip={this.state.available === true ? 'Available' : this.state.available === false ? 'Already taken' : ''} onChange={this.handleUsernameChange.bind(this)}/>
				<FormInput type='password' placeholder='Password' minlength='8' ref='inputPassword'/>
				<FormInput type='email' placeholder='Email' minlength='8' ref='inputEmail'/>
				<FormCheckbox text='I agree to the terms and conditions of TourMate' ref='inputAccepted' onChange={this.handleCheckChange.bind(this)}/>
				<FormButton enabled={this.state.available === true && this.state.agreed === true} text='Register'/>
			</Form>
		);
	}
};
 
export default RegisterContainer = createContainer((props) => {
  return {
  	currentUser: Meteor.user()
  };
}, Register);
