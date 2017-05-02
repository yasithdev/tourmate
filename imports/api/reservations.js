import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Reservations = new Mongo.Collection('reservations');

/* 'reservations' Schema
 * -------------------
 * |--- tourist : id
 * |--- tour-provider : id
 * |--- service : string
 * |--- startDate : date
 * |--- endDate : date
 * |--- status : string (pending, accepted, completed, cancelled)
 * |--- message : string
 */

if (Meteor.isServer) {
  Meteor.publish('reservations', () => {
  	if(Meteor.user().profile.role == "tourist") return Reservations.find({tourist: this.userId()});
  	else if(Meteor.user().profile.role == "tour-provider") return Reservations.find({tourProvider: this.userId()});
  	else return Reservations.find();
  });
}

Meteor.methods({

	// Inserts a new reservation
	'reservations.insert': (reservation) => {
		check(reservation.tourist, String);
		check(reservation.tourProvider, String);
		check(reservation.service, String);
		check(reservation.startDate, String);
		check(reservation.endDate, String);
		check(reservation.message, String);
		// For any reservation, set status to pending on insert
		reservation['status'] = 'pending';
		if( reservation[Meteor.user().profile.role] !== this.userId() ) throw new Meteor.error('Reservation not made for current user');

		Reservations.insert(reservation);
		return true;
	},

	// Updates an existing reservation
	'reservations.update': (reservation) => {
		Reservations.updateOne({'_id' : reservation._id}, {$set: reservation});
		return true;
	},

	// Deletes an existing reservation
	'reservations.delete': (id) => {
		Reservations.deleteOne({'_id' : id});
		return true;
	},
});