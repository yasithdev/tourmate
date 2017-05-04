import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Row, Col, Modal } from '../common/Components';
import { Reservations as ReservationsDb } from '../../api/reservations';

/* ------------------------------------------------------------ *
 * Reservation page for tour provider ------------------------- *
 * ------------------------------------------------------------ */
class Reservations extends React.Component {
	constructor(props){
		super(props);
	}

	handleAcceptReservation(reservation){
		console.log("Running handleAcceptReservation");
		Meteor.call('reservations.update', reservation._id, {'status' : 'accepted'} , (error, result) => {
			if(result) alert("Successfully accepted");
		});
	}

	handleRejectReservation(reservation, message){
		console.log("Running handleRejectReservation", message);
		Meteor.call('reservations.update', reservation._id, {'status' : 'rejected'} , (error, result) => {
			if(result) alert("Successfully rejected");
		});
	}

	handleCancelReservation(reservation){
		console.log("Running handleCancelReservation");
		Meteor.call('reservations.update', reservation._id, {'status' : 'canceled'} , (error, result) => {
			if(result) alert("Successfully canceled");
		});
	}

	handleDisputeReservation(reservation, message){
		console.log("Running handleDisputeReservation", message);
		Meteor.call('reservations.update', reservation._id, {'status' : 'disputed'} , (error, result) => {
			if(result) alert("Successfully disputed");
		});
	}

	render(){
		return (
			<div>
				<h2> Pending Reservations </h2>
				{/*Pending Reservations - Can be accepted or rejected*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pending").map((reservation) => (<PendingReservation onAcceptReservation={this.handleAcceptReservation} onRejectReservation={this.handleRejectReservation} username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Accepted Reservations </h2>
				{/*Accepted Reservations - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "accepted").map((reservation) => (<AcceptedReservation username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Completed Reservations </h2>
				{/*Completed Reservations - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "completed").map((reservation) => (<CompletedReservation username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Canceled Reservations </h2>
				{/*Canceled Reservations - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "canceled").map((reservation) => (<CanceledReservation username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Pending Cancellation </h2>
				{/*Pending Cancellations - Can accept or dispute*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pendingcancel").map((reservation) => (<PendingCancelReservation onConfirmCancellation={this.handleCancelReservation} onDisputeCancellation={this.handleDisputeReservation} username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}
			</div>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Reservations ------------------- *
 * ------------------------------------------------------------ */
export default ReservationsContainer = createContainer((props) => {
	Meteor.subscribe('tourists');
	Meteor.subscribe('reservations', Meteor.user().profile.role, Meteor.userId());
	return {
		currentUser : Meteor.user(),
		reservations : ReservationsDb.find().fetch(),
		usernameById : (userId) => (Meteor.users.findOne(userId) ? Meteor.users.findOne(userId)['username'] : ('')),
	};
}, Reservations);

/* ------------------------------------------------------------ *
 * Component to display each type of reservation -------------- *
 * ------------------------------------------------------------ */
class PendingReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "pending") throw 'Invalid reservation';
	}

	handleAcceptClick(event){
		event.preventDefault();
		this.props.onAcceptReservation(this.props.reservation);
	}

	handleRejectClick(event){
		event.preventDefault();
		this.props.onRejectReservation(this.props.reservation, this.refs.inputMessage.value);
	}

	render() {
		return (
			<div>
				<div className="panel panel-warning">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
								<span className="text-right">
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal">Accept</Button>
									<Button id={this.props.reservation._id} dataToggle="modal" dataTarget="#rejectionModal">Reject</Button>
								</span>
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tourist</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>

				<Modal id="confirmationModal" title="Confirmation" cancelText="No" submitText="Yes" onClick={this.handleAcceptClick.bind(this)}>
					<p>{"Are you sure you want to Accept this reservation?"}</p>
				</Modal>
				<Modal id="rejectionModal" title="Rejection" cancelText="Back" submitText="Confirm" onClick={this.handleRejectClick.bind(this)}>
					<p>{"Please enter your reason for rejection."}</p>
					<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}}/>
				</Modal>

			</div>
		);
	}
}

class AcceptedReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "accepted") throw 'Invalid reservation';
	}

	render() {
		return (
			<div>
				<div className="panel panel-primary">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tourist</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>
			</div>
		);
	}
}

class CompletedReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "completed") throw 'Invalid reservation';
	}

	render() {
		return (
			<div>
				<div className="panel panel-success">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tourist</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>
			</div>
		);
	}
}

class CanceledReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "canceled") throw 'Invalid reservation';
	}

	render() {
		return (
			<div>
				<div className="panel panel-default">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tourist</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>
			</div>
		);
	}
}

class PendingCancelReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "pendingcancel") throw 'Invalid reservation';
	}

	handleConfirmClick(event){
		event.preventDefault();
		this.props.onConfirmCancellation(this.props.reservation);
	}

	handleDisputeClick(event){
		event.preventDefault();
		this.props.onDisputeCancellation(this.props.reservation, this.refs.inputMessage.value);
	}

	render() {
		return (
			<div>
				<div className="panel panel-danger">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
								<span className="text-right">
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal">Accept</Button>
									<Button id={this.props.reservation._id} dataToggle="modal" dataTarget="#rejectionModal">Dispute</Button>
								</span>
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tourist</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>

				<Modal id="confirmationModal" title="Confirmation" cancelText="No" submitText="Yes" onClick={this.handleConfirmClick.bind(this)}>
					<p>{"Are you sure you want to confirm this Cancellation?"}</p>
				</Modal>
				<Modal id="rejectionModal" title="Dispute" cancelText="Back" submitText="Confirm" onClick={this.handleDisputeClick.bind(this)}>
					<p>{"Please enter your reason for dispute."}</p>
					<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}}/>
				</Modal>

			</div>
		);
	}
}