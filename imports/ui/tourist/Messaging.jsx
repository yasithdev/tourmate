import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { FluidContainer, Col, Row, Button } from '../common/Components';

import { Reservations } from '../../api/reservations';
import { Messages } from '../../api/messages';

/* ------------------------------------------------------------ *
 * Messaging page for tourist --------------------------------- *
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
		let recipient = this.state.reservation['tour-provider'];
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
				<h2> Messaging </h2>
				<Col widthXS="4">
					<ReservationList source={this.props.reservations} onClick={this.handleSelectionChange.bind(this)}/>
				</Col>
				<Col widthXS="8">
					<Conversation sender={this.props.currentUser['_id']} title={this.state.reservation['message']} messages={this.props.messages(this.state.reservation['_id'])}/>
					{this.state.reservation ? (<ChatBox ref="chatbox" onSubmit={this.handleSubmit.bind(this)}/>) : ('')}
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
			<FluidContainer>
				{this.props.source.map((reservation) => (<Button key={reservation['_id']} id={reservation['_id']} onClick={this.props.onClick}>{reservation.message}</Button>))}
			</FluidContainer>
		);
	}
}

export class Conversation extends React.Component {
	constructor(props){
		super(props);
	}
	
	render() {
		return (
			<div className="well bs-component">
				<h2>{this.props.title}</h2>
				{this.props.sender
					?	this.props.messages.map((msg) => (this.props.sender == msg.sender ? <SentMessage key={msg['_id']} message={msg}/> : <ReceivedMessage key={msg['_id']} message={msg}/>))
					: ('')
				}
			</div>
		);
	}
}

const SentMessage = function(props) {return (<Row><div className="success pull-right">{props.message.messagetext}</div></Row>);};
const ReceivedMessage = function(props) {return (<Row><div className="warning pull-left">{props.message.messagetext}</div></Row>);};

export class ChatBox extends React.Component {
	constructor(props){
		super(props);
		this.state = {'text' : ''};
	}

	handleChange(event){
		this.setState({'text' : event.target.value});
	}
	
	render() {
		return (
				<div className="well bs-component">
					<Row>
						<Col width="10"><textArea ref="inputMessage" value={this.state.text} onChange={this.handleChange.bind(this)} rows="3" style={{'width' : '100%'}}/></Col>
						<Col width="2"><Button type="primary" disabled={this.state.text == ''} onClick={this.props.onSubmit}>Send</Button></Col>
					</Row>
				</div>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Messaging ---------------------- *
 * ------------------------------------------------------------ */
export default MessagingContainer = createContainer(function(props) {
	Meteor.subscribe('reservations');
	Meteor.subscribe('messages');
	return {
    currentUser: Meteor.user(),
    reservations : Reservations.find({'tourist': Meteor.userId()}).fetch(),
    allmessages : Messages.find().fetch(),
		messages : (id) => Messages.find({'reservation': id}).fetch(),
  };
}, Messaging);