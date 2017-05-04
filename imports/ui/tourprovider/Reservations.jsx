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

	handleUpdate(reservation){
		console.log(reservation);
		Meteor.call('reservations.update', reservation, (error, result) => {
			if(result) alert("Successfully updated");
		})
	}

	render(){
		return (
			<div>
				<h2> Pending Reservations </h2>
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pending").map((reservation) => (<ReservationRecord onUpdated={this.handleUpdate} username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Accepted Reservations </h2>
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "accepted").map((reservation) => (<ReservationRecord username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Completed Reservations </h2>
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "completed").map((reservation) => (<ReservationRecord username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Canceled Reservations </h2>
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "canceled").map((reservation) => (<ReservationRecord username={this.props.usernameById(reservation.tourist)} key={reservation._id} reservation={reservation}/>)) : ''}
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
 * Component to display each reservation ---------------------- *
 * ------------------------------------------------------------ */
class ReservationRecord extends React.Component {
	constructor(props){
		super(props);
		this.selectedAction = "";
		this.selectedId = "";
	}

	handleAction(event){
		if(this.selectedId && this.selectedAction){
			let reservation = {'_id' : this.selectedId, 'status' : this.selectedAction};
			this.props.onUpdated(reservation);
		}
	}

	handleSelect(event, action){
		this.selectedId = event.target.id;
		this.selectedAction = event.target.innerHTML == "Accept" ? "accepted" : event.target.innerHTML == "Reject" ? "canceled" : "pending";
	}

	render() {
		return (
			<div>
				<div className={"panel " + (
					this.props.reservation.status == "pending" ? "panel-warning" :
					this.props.reservation.status == "accepted" ? "panel-primary" :
					this.props.reservation.status == "completed" ? "panel-success" : "panel-default")}>
					<div className="panel-heading">
						<Row>
							<Col widthXS="8"><strong className="panel-title">{this.props.reservation.message}</strong></Col>
							<Col className="text-right" widthXS="4">
								{this.props.reservation.status == "pending" 
									? (<span className="text-right">
											<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal" onClick={this.handleSelect.bind(this)}>Accept</Button>
											<Button id={this.props.reservation._id} dataToggle="modal" dataTarget="#confirmationModal" onClick={this.handleSelect.bind(this)}>Reject</Button>
										</span>)
									: ('')
								}
							</Col>
						</Row>
					</div>
					<div className="panel-body">
						<Row><Col widthXS="2"><strong>Tourist</strong></Col><Col widthXS="10">{this.props.username}</Col></Row>
						<Row><Col widthXS="2"><strong>Start Date</strong></Col><Col widthXS="10">{this.props.reservation.startDate.toLocaleDateString()}</Col></Row>
						<Row><Col widthXS="2"><strong>End Date</strong></Col><Col widthXS="10">{this.props.reservation.endDate.toLocaleDateString()}</Col></Row>
					</div>
				</div>

				<Modal id="confirmationModal" title="Confirmation" cancelText="No" submitText="Yes" onClick={this.handleAction.bind(this)}>
					<p>Are you sure?</p>
				</Modal>

			</div>
		);
	}
}