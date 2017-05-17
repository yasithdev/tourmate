import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Reservations } from './reservations';

export const Reviews = new Mongo.Collection('reviews');

/* 'reviews' Schema
 * -------------------
 * |--- reservation : id
 * |--- title : String
 * |--- rating : int (between 1 and 5 inclusive)
 * |--- review : String
 * |--- date : Date
 */

if (Meteor.isServer) {
	// Only return review that are made for reservations where current user is involved
  Meteor.publish('reviews', function() {
  	let user = Meteor.users.findOne({'_id' : this.userId});
  	if(user){
  		params = {};
  		params[user.profile.role] = this.userId;
  		let reservations = Reservations.find(params).fetch().map((r) => (r['_id']));
  		if(reservations){
  			return Reviews.find({ 'reservation' : { $in : reservations } });
  		}
  	}
  	return null;
  });
}

Meteor.methods({

	// Inserts a new review
	'reviews.insert': (review) => {
		check(review['reservation'], String);
		check(review['title'], String);
		check(review['rating'], Number);
		check(review['review'], String);
		if(review['rating'] > 5 || review['rating'] < 1) throw new Meteor.error('invalid value for rating');
		// Set default values
		review['date'] = new Date();
		// If constraints satisfied, insert review
		Reviews.insert(review);
		return true;
	},

	// Updates an existing review
	'reviews.update': (review) => {

	},
	
	// Deletes an existing review
	'reviews.delete': (id) => {
		
	},
});