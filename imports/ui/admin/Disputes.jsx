import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Row, Col, Modal, FluidContainer } from '../common/Components';
import { Reservations as ReservationsDb } from '../../api/reservations';

/* ------------------------------------------------------------ *
 * Reservation page for tour provider ------------------------- *
 * ------------------------------------------------------------ */
class Disputes extends React.Component {
	constructor(props){
		super(props);
	}

	handleAcceptRequest(reservation){
		console.log("Running handleAcceptRequest");
		Meteor.call('reservations.update', reservation._id, {'status' : 'canceled'} , (error, result) => {
			if(result) alert("Successfully update as canceled");
		});
	}

	handleRejectRequest(reservation){
		console.log("Running handleRejectRequest");
		Meteor.call('reservations.update', reservation._id, {'status' : 'accepted'} , (error, result) => {
			if(result) alert("Successfully update back to accpted");
		});
	}

	render(){
		return (
			<FluidContainer>
				<div className="well bs-component">
					<h2>Pending Disputes</h2>
					{/*Pending Disputes - Can be accepted or rejected*/}
					{this.props.reservations ? this.props.reservations.map((reservation) => (<DisputedReservation onAcceptCancellationRequest={this.handleAcceptRequest} onRejectCancellationRequest={this.handleRejectRequest} username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}
				</div>
			</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Disputes ----------------------- *
 * ------------------------------------------------------------ */
export default ReservationsContainer = createContainer(function(props) {
	Meteor.subscribe('tourists');
	Meteor.subscribe('reservations');
	return {
		currentUser : Meteor.user(),
		reservations : ReservationsDb.find({'status' : 'disputed'}).fetch(),
		usernameById : (userId) => (Meteor.users.findOne(userId) ? Meteor.users.findOne(userId)['username'] : ('')),
	};
}, Disputes);

/* ------------------------------------------------------------ *
 * Component to display each type of reservation -------------- *
 * ------------------------------------------------------------ */
class DisputedReservation extends React.Component {
	constructor(props){
		super(props);
		if(this.props.reservation.status != "disputed") throw 'Invalid reservation';
	}

	handleAcceptClick(event){
		event.preventDefault();
		this.props.onAcceptCancellationRequest(this.props.reservation);
		// Update reservation as canceled
	}

	handleRejectClick(event){
		event.preventDefault();
		this.props.onRejectCancellationRequest(this.props.reservation, this.refs.inputMessage.value);
		// update reservation as accepted
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
					<p>{"Are you sure you want to accept this Cancellation Request?"}</p>
				</Modal>
				<Modal id="rejectionModal" title="Dismissal" cancelText="Back" submitText="Confirm" onClick={this.handleRejectClick.bind(this)}>
					<p>{"Please enter your reason for rejection of Cancellation Request."}</p>
					<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}}/>
				</Modal>
			</div>
		);
	}
}