import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { FluidContainer, Col, Row, Button, ReservationList, Conversation, ChatBox } from '../common/Components';

import { Reservations } from '../../api/reservations';
import { Messages } from '../../api/messages';

/* ------------------------------------------------------------ *
 * Messaging page for tour provider --------------------------- *
 * ------------------------------------------------------------ */
export class Messaging extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'reservation' : '',
			'title' : '',
			'unreadCount' : ''
		};
	}

	handleSubmit(event){
		// Insert a new message from user to recipient, for current reservation
		let messagetext = this.refs.chatbox.refs.inputMessage.value;
		this.refs.chatbox.setState({'text' : ''});
		// Empty message handling
		if(messagetext == "") return;
		let sender = this.props.currentUser['_id'];
		let recipient = this.state.reservation['tourist'];
		let reservation = this.state.reservation['_id'];

		let message = {'sender' : sender, 'recipient' : recipient, 'reservation' : reservation, 'messagetext' : messagetext};
		Meteor.call('messages.insert', message, (error, result) => {
			console.log(error, result);
		});
		this.setState({'reservation' : this.state.reservation});
	}

	handleSelectionChange(event){
		// Set the state to reservation : new selection
		if(this.state.reservation['_id'] == event.target.id) return;
		this.setState({
			'reservation' : this.props.reservations.find((reservation) => reservation['_id'] == event.target.id), 
			'title' : event.target.innerHTML
		});
	}

	render() {
		return( 
			<FluidContainer>
				<div className="well bs-component">
					<h2> Messaging </h2>
					<Row>
						<Col widthXS="4">
							<ReservationList source={this.props.reservations} onClick={this.handleSelectionChange.bind(this)}/>
						</Col>
						<Col widthXS="8">
							<Conversation sender={this.props.currentUser['_id']} senderName={this.props.namebyuserid(this.state.reservation['tour-provider'])} recipientName={this.props.namebyuserid(this.state.reservation['tourist'])} title={this.state.reservation['message']} messages={this.props.messages(this.state.reservation['_id'])}/>
							{this.state.reservation ? (<ChatBox ref="chatbox" onSubmit={this.handleSubmit.bind(this)}/>) : ('')}
						</Col>
					</Row>
				</div>
			</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Messaging ---------------------- *
 * ------------------------------------------------------------ */
export default MessagingContainer = createContainer(function(props) {
	Meteor.subscribe('reservations');
	Meteor.subscribe('messages');
	Meteor.subscribe('reservationusers');
  return {
    currentUser: Meteor.user(),
    reservations : Reservations.find({'tour-provider': Meteor.userId()}).fetch(),
    namebyuserid : function(id) { 
    	let user = Meteor.users.find({'_id' : id}).fetch()[0];
    	console.log(user);
    	return (user ? user.profile.name : '');
    },
    allmessages : Messages.find().fetch(),
		messages : (id) => Messages.find({'reservation': id}).fetch(),
  };
}, Messaging);