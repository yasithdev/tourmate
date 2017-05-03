import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Button, Row, Col } from '../common/Components';
import { Reservations as ReservationsDb } from '../../api/reservations';

/* ----------
 * Components
 * ---------- */

// Work Item - Reservation records with different statuses show in different panel colours
export class ReservationRecord extends React.Component {
	constructor(props){
		super(props);
	}

	handleClick(event){
		console.log(event.target.id);
	}

	render() {
		return (
			<div className={"panel " + (
				this.props.reservation.status == "Pending" ? "panel-danger" :
				this.props.reservation.status == "Accepted" ? "panel-primary" :
				this.props.reservation.status == "Completed" ? "panel-success" : "panel-default")}>
				<div className="panel-heading">
					<Row>
						<Col width="8"><h3 className="panel-title">{this.props.reservation.message}</h3></Col>
						<Col className="text-right" width="4"><Button id={this.props.reservation} onClick={this.handleClick.bind(this)}>Click</Button></Col>
					</Row>
				</div>
				<div className="panel-body">Description</div>
			</div>
		);
	}
}

// reservations page for tourprovider
export class Reservations extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<h2> Reservations </h2>
			{this.props.reservations ? this.props.reservations.map((reservation) => (<ReservationRecord key={reservation} reservation={reservation}/>)) : ''}
			</div>
		);
	}
}

export default ReservationsContainer = createContainer((props) => {
	Meteor.subscribe('reservations', Meteor.user().profile.role, Meteor.userId());
	return {
		currentUser: Meteor.user(),
		reservations : ReservationsDb.find().fetch(),
	};
}, Reservations);