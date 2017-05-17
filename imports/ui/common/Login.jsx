import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Jumbotron, Form, FormInput, FormButton, FluidContainer } from './Components'

export class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {'isLoggedIn' : false};
	}

	// componentDidMount(){
	// 	if(this.state.isLoggedIn){
	// 		this.props.history.push("/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username + "/");
	// 	}
	// }

	render() {
		if(this.state.isLoggedIn) {
			return (<FluidContainer><div className="jumbotron text-center">Successfully Logged In. Redirecting..</div></FluidContainer>);
		}
		else return(
			<FluidContainer>
				<Form onSubmit={this.handleSubmit.bind(this)} title="Log in to your Account">
					<FormInput type='text' ref='inputUsername' placeholder='User Name'/>
					<FormInput type='password' ref='inputPassword' placeholder='Password'/>
					<FormButton text='Log in'/>
				</Form>
			</FluidContainer>
		);
	}

	handleSubmit(event){
		event.preventDefault();
		let username = this.refs.inputUsername.refs.input.value;
		let password = this.refs.inputPassword.refs.input.value;
		
		// Login
		Meteor.loginWithPassword(username, password, (error) => {
			if(!error) {
				this.setState({'isLoggedIn' : true});
			} else {
				alert('The username or password you entered was incorrect');
			}
		});
	}
}

export default LoginContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, Login);