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

	handleDeleteReservation(reservation){
		console.log("Running handleDeleteReservation");
		Meteor.call('reservations.delete', reservation._id, (error, result) => {
			if(result) alert("Successfully deleted");
		});
	}

	handleCancelReservation(reservation){
		console.log("Running handleCancelReservation");
		Meteor.call('reservations.update', reservation._id, {'status' : 'canceled'} , (error, result) => {
			if(result) alert("Successfully canceled");
		});
	}

	handleWriteReview(reservation){
		console.log("Running handleWriteReview");
		console.log('not implemented');
	}

	render(){
		return (
			<div>
				<h2> Pending Reservations </h2>
				{/*Pending Reservations - Can be cancelled (deleted from database)*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pending").map((reservation) => (<PendingReservation onDeleteReservation={this.handleDeleteReservation} username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Accepted Reservations </h2>
				{/*Accepted Reservations - Can be cancelled (request to cancel with message)*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "accepted").map((reservation) => (<AcceptedReservation onCancelReservation={this.handleCancelReservation} username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Completed Reservations </h2>
				{/*Completed Reservations - Can write a review, or view the review if one exists*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "completed").map((reservation) => (<CompletedReservation onWriteReview={this.handleWriteReview} username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Canceled Reservations </h2>
				{/*Cancelled Reservations - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "canceled").map((reservation) => (<CancelledReservation username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Pending Cancellation </h2>
				{/*Pending Cancellation - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pendingcancel").map((reservation) => (<PendingCancelReservation username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}
			</div>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Reservations ------------------- *
 * ------------------------------------------------------------ */
export default ReservationsContainer = createContainer((props) => {
	Meteor.subscribe('tour-providers');
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

	handleClick(event){
		this.props.onDeleteReservation(this.props.reservation);
	}

	render() {
		return (
			<div>
				<div className="panel panel-warning">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
								{/*Controls*/}
								<span className="text-right">
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal">Cancel</Button>
								</span>
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tour Provider</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>
				<Modal id="confirmationModal" title="Confirmation" cancelText="No" submitText="Yes" onClick={this.handleClick.bind(this)}>
					<p>{"Are you sure you want to cancel?"}</p>
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

	handleClick(event){
		this.props.onCancelReservation(this.props.reservation);
	}

	render() {
		return (
			<div>
				<div className="panel panel-primary">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
								<span className="text-right">
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal">Cancel</Button>
								</span>
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tour Provider</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>

				<Modal id="confirmationModal" title="Confirmation" cancelText="No" submitText="Yes" onClick={this.handleClick.bind(this)}>
					<p>{"Are you sure you want to request a cancellation?"}</p>
				</Modal>

			</div>
		);
	}
}

class CompletedReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "completed") throw 'Invalid reservation';
	}

	handleClick(event){
		this.props.onWriteReview(this.props.reservation, this.refs.inputMessage.value);
	}

	render() {
		return (
			<div>
				<div className="panel panel-success">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
								<span className="text-right">
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal">Write a Review</Button>
								</span>
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tour Provider</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>

				<Modal id="<confirmationModaldiv></confirmationModaldiv>" title="Enter your review here" cancelText="Close" submitText="Make Reservation" onClick={this.handleClick.bind(this)}>
					<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}}/>
				</Modal>

			</div>
		);
	}
}

class CancelledReservation extends React.Component {
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
							<Col className="text-right" widthXS="4"></Col>
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

	render() {
		return (
			<div>
				<div className="panel panel-danger">
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4"></Col>
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