import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactStars from 'react-stars';

import { Button, Row, Col, Modal, FluidContainer } from '../common/Components';
import { Reservations as ReservationsDb } from '../../api/reservations';
import { Reviews } from '../../api/reviews';

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

	handleCancelAcceptedReservation(reservation){
		console.log("Running handleCancelAcceptedReservation");
		Meteor.call('reservations.update', reservation._id, {'status' : 'pendingcancel'} , (error, result) => {
			if(result) alert("Successfully marked for cancellation");
		});
	}

	handleCompleteReservation(reservation){
		console.log("Running handleCompleteReservation");
		Meteor.call('reservations.update', reservation._id, {'status' : 'completed'} , (error, result) => {
			if(result) alert("Successfully marked as completed");
		});
	}

	handleWriteReview(review){
		console.log("Running handleWriteReview");
		console.log(review);
		Meteor.call('reviews.insert', review , (error, result) => {
			if(result) alert("Successfully added the review");
		});
	}

	handleUpdateReview(review){
		console.log("Running handleWriteReview");
		console.log(review);
		Meteor.call('reviews.update', review , (error, result) => {
			if(result) alert("Successfully updated the review");
		});
	}

	render(){
		return (
			<FluidContainer>
				<h2> Pending Reservations </h2>
				{/*Pending Reservations - Can be cancelled (deleted from database)*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pending").map((reservation) => (<PendingReservation onDeleteReservation={this.handleDeleteReservation} username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Accepted Reservations </h2>
				{/*Accepted Reservations - Can be cancelled (request to cancel with message)*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "accepted").map((reservation) => (<AcceptedReservation onCancelReservation={this.handleCancelAcceptedReservation} onCompleteReservation={this.handleCompleteReservation} username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Completed Reservations </h2>
				{/*Completed Reservations - Can write a review, or view the review if one exists*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "completed").map((reservation) => (<CompletedReservation onWriteReview={this.handleWriteReview} onUpdateReview={this.handleUpdateReview} existingReview={this.props.getReview(reservation._id)} username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Canceled Reservations </h2>
				{/*Cancelled Reservations - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "canceled").map((reservation) => (<CancelledReservation username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}

				<h2> Pending Cancellation </h2>
				{/*Pending Cancellation - No action possible*/}
				{this.props.reservations ? this.props.reservations.filter((reservation) => reservation.status == "pendingcancel").map((reservation) => (<PendingCancelReservation username={this.props.usernameById(reservation['tour-provider'])} key={reservation._id} reservation={reservation}/>)) : ''}
			</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Reservations ------------------- *
 * ------------------------------------------------------------ */
export default ReservationsContainer = createContainer(function(props) {
	Meteor.subscribe('tour-providers');
	Meteor.subscribe('reservations', Meteor.user().profile.role, Meteor.userId());
	Meteor.subscribe('reviews');
	return {
		currentUser : Meteor.user(),
		reservations : ReservationsDb.find().fetch(),
		getReview : (reservationId) => Reviews.find({'reservation' : reservationId}).fetch()[0],
		allReviews : Reviews.find().fetch(),
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

	handleComplete(event){
		this.props.onCompleteReservation(this.props.reservation);
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
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#completionModal">Complete</Button>
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
				<Modal id="completionModal" title="Mark Completion" cancelText="No" submitText="Yes" onClick={this.handleComplete.bind(this)}>
					<p>{"Are you sure you want to mark this reservation as completed?"}</p>
				</Modal>

			</div>
		);
	}
}

class CompletedReservation extends React.Component {
	constructor(props){
		super(props);
		this.state = {'rating' : ''};
		if(this.props.reservation.status != "completed") throw 'Invalid reservation';
	}

	componentDidUpdate(){
		if(this.props.existingReview){
			if(this.state.rating == '') this.setState({
				'rating' : this.props.existingReview.rating,
				'title' : this.props.existingReview.title,
				'review' : this.props.existingReview.review
			});
		}
	}

	handleTitleChange(event){
		this.setState({'title' : event.target.value});
	}

	handleReviewChange(event){
		this.setState({'review' : event.target.value});
	}

	handleWriteReview(event){
		let review = {
			'reservation' : this.props.reservation['_id'],
			'review' : this.refs.inputMessage.value,
			'title' : this.refs.inputTitle.value,
			'rating' : this.state.rating
		}
		this.props.onWriteReview(review);
	}

	handleUpdateReview(event){
		let existingReview = this.props.existingReview;
		// Check if update necessary
		let title = this.refs.inputTitle.value;
		let rating = this.state.rating;
		let review = this.refs.inputMessage.value;
		if(title == existingReview.title && rating == existingReview.rating && review == existingReview.review) throw new Meteor.error('Nothing to update');
		// Call update
		let updatedReview = {
			'_id' : existingReview['_id'],
			'reservation' : this.props.reservation['_id'],
			'review' : review,
			'title' : title,
			'rating' : rating
		};
		this.props.onUpdateReview(updatedReview);
	}

	handleRatingChange(newRating){
		this.setState({'rating' : newRating});
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
									{this.props.existingReview ? <span style={{'padding' : '5px'}} ><strong>(Reviewed)</strong></span> : ('')}
									<Button type="primary" id={this.props.reservation._id} dataToggle="modal" dataTarget="#reviewModal">{this.props.existingReview ? 'See Your Review' : 'Write a Review'}</Button>
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

				{ this.props.existingReview 
					? (
						<Modal id="reviewModal" title="Edit your review" cancelText="Close" submitText="Update" onClick={this.handleUpdateReview.bind(this)}>
							<textArea ref="inputTitle" rows="1" style={{'width' : '100%'}} value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
							<ReactStars ref="inputRating" count={5} onChange={this.handleRatingChange.bind(this)} value={this.state.rating ? this.state.rating : 2.5}/>
							<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}} value={this.state.review} onChange={this.handleReviewChange.bind(this)}/>
						</Modal>
						)
					: (
						<Modal id="reviewModal" title="Enter your review here" cancelText="Close" submitText="Review" onClick={this.handleWriteReview.bind(this)}>
							<textArea ref="inputTitle" rows="1" style={{'width' : '100%'}}/>
							<ReactStars ref="inputRating" count={5} onChange={this.handleRatingChange.bind(this)} value={this.state.rating ? this.state.rating : 2.5} />
							<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}}/>
						</Modal>
					)}
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