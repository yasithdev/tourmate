import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { FluidContainer, Row, Col, ReservationList, Review } from '../common/Components';

import { Reservations } from '../../api/reservations';
import { Reviews as ReviewsDb } from '../../api/reviews';

/* ------------------------------------------------------------ *
 * Reviews page for tour provider ----------------------------- *
 * ------------------------------------------------------------ */
export class Reviews extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			'reservation' : ''
		};
	}

	handleSelectionChange(event){
		// Set the state to reservation : new selection
		if(this.state.reservation) {
			if(this.state.reservation['_id'] == event.target.id) return;
		}
		this.setState({
			'reservation' : this.props.reservations.find((reservation) => reservation['_id'] == event.target.id)
		});
	}

	render() {
		return( 
			<FluidContainer>
				<div className="well bs-component">
					<h2> Reviews ({this.props.reviewCount}) </h2>
					{/*Show list of all reservations along with their reviews once selected*/}
					<Row>
						<Col widthXS="4">
							<ReservationList source={this.props.reservations} onClick={this.handleSelectionChange.bind(this)}/>
						</Col>
						<Col widthXS="8">
							{this.props.reviews(this.state.reservation['_id']).map((review) => <Review key={review['_id']} review={review}/>)}
						</Col>
					</Row>
				</div>
			</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Reviews ------------------------ *
 * ------------------------------------------------------------ */

export default ReviewsContainer = createContainer(function(props) {
	Meteor.subscribe('reservations');
	Meteor.subscribe('reviews');
  return {
    currentUser: Meteor.user(),
    reservations : Reservations.find({'status' : 'completed'}).fetch(),
    namebyuserid : function(id) { 
    	let user = Meteor.users.find({'_id' : id}).fetch()[0];
    	return (user ? user.profile.name : '');
    },
    reviewCount : ReviewsDb.find().count(),
		reviews : (reservationid) => ReviewsDb.find({'reservation': reservationid}).fetch(),
  };
}, Reviews);