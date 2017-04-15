import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Reservations = new Mongo.Collection('reservations');

if (Meteor.isServer) {
  Meteor.publish('reservations', () => {
    return Reservations.find({userId: this.userId});
  });
}

Meteor.methods({

	// Inserts a new reservation
	'reservations.insert': (reservation) => {

	},

	// Updates an existing reservation
	'reservations.update': (reservation) => {

	},

	// Deletes an existing reservation
	'reservations.delete': (id) => {
		
	},
});