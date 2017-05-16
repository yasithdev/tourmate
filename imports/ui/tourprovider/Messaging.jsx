import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {FluidContainer, Col} from '../common/Components';

/* ------------------------------------------------------------ *
 * Messaging page for tour provider --------------------------- *
 * ------------------------------------------------------------ */
export class Messaging extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return( 
			<FluidContainer>
				<h2> Messaging </h2>
				<Col widthXS="4">
					<ReservationList/>
				</Col> 
				<Col widthXS="8">
					<Conversation/>
					<ChatBox/>
				</Col>
			</FluidContainer>
		);
	}
}

export class ReservationList extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<FluidContainer>Reservation List</FluidContainer>
		);
	}
}

export class Conversation extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<FluidContainer>Conversation</FluidContainer>
		);
	}
}

const SentMessage = function(props) {return (<div className="success">{this.props.text}</div>);};
const ReceivedMessage = function(props) {return (<div className="warning">{this.props.text}</div>);};

export class ChatBox extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<FluidContainer>ChatBox</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Messaging ---------------------- *
 * ------------------------------------------------------------ */
export default MessagingContainer = createContainer(function(props) {
  return {
    currentUser: Meteor.user(),
  };
}, Messaging);