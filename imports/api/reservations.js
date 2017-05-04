import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Reservations = new Mongo.Collection('reservations');

/* 'reservations' Schema
 * -------------------
 * |--- tourist : id
 * |--- tour-provider : id
 * |--- services : Array
 * |--- startDate : date
 * |--- endDate : date
 * |--- status : string (pending, accepted, completed, pendingcancel, canceled)
 * |--- message : string
 */

if (Meteor.isServer) {
  Meteor.publish('reservations', function () {
  	let user = Meteor.users.findOne(this.userId);
  	if(user){
			if(user.profile.role == 'tourist') return Reservations.find({'tourist': this.userId});
			else if(user.profile.role == 'tour-provider') return Reservations.find({'tour-provider': this.userId});
			else return Reservations.find();
		}
  });
}

Meteor.methods({

	// Inserts a new reservation
	'reservations.insert': (reservation) => {
		check(reservation['tourist'], String);
		check(reservation['tour-provider'], String);
		check(reservation['services'], Array);
		check(reservation['startDate'], Date);
		check(reservation['endDate'], Date);
		check(reservation['message'], String);
		// For any reservation, set status to pending on insert
		reservation['status'] = 'pending';
		if( reservation[Meteor.user().profile.role] !== Meteor.userId() ) throw new Meteor.error('Reservation not made for current user');

		Reservations.insert(reservation);
		return true;
	},

	// Updates an existing reservation
	'reservations.update': (id, params) => {
		if(params['tourist']) check(params['tourist'], String);
		if(params['tour-provider']) check(params['tour-provider'], String);
		if(params['services']) check(params['services'], Array);
		if(params['startDate']) check(params['startDate'], Date);
		if(params['endDate']) check(params['endDate'], Date);
		if(params['message']) check(params['message'], String);
		Reservations.update({'_id' : id}, {$set: params});
		return true;
	},

	// Deletes an existing reservation
	'reservations.delete': (id) => {
		Reservations.delete({'_id' : id});
		return true;
	},
});