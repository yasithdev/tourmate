import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Reservations as ReservationsDb } from '../../api/reservations';

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
	Meteor.subscribe('reservations');
	return {
		currentUser: Meteor.user(),
		reservations : ReservationsDb.find().fetch(),
	};
}, Reservations);

/* ----------
 * Components
 * ---------- */

 // Work Item - Reservation records with different statuses show in different panel colours
const ReservationRecord = (props) => (
	<div className="panel panel-default">
		<div className="panel-heading"><h3 className="panel-title">{props.reservation.message}</h3></div>
		<div className="panel-body">Description</div>
	</div>
);