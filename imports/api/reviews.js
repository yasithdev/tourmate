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
			if (user.role != 'admin') params[user.profile.role] = this.userId;
			let reservations = Reservations.find(params).fetch().map((r) => (r['_id']));
			if(reservations){
				var query = {}
				if (user.role != 'admin') query['reservation'] = { $in : reservations };
				return Reviews.find(query);
			}
		}
		return Reviews.find({null});
	});
}

Meteor.methods({

	// Inserts a new review
	'reviews.insert': (review) => {
		check(review['reservation'], String);
		check(review['title'], String);
		check(review['rating'], Number);
		check(review['review'], String);
		if(Meteor.user().profile.role != 'tourist') throw new Meteor.Error('current user is not a tourist');
		if(review['rating'] > 5 || review['rating'] < 1) throw new Meteor.Error('invalid value for rating');
		// Set default values
		review['date'] = new Date();
		// If constraints satisfied, insert review
		Reviews.insert(review);
		return true;
	},

	// Updates an existing review
	'reviews.update': (review) => {
		check(review['reservation'], String);
		check(review['title'], String);
		check(review['rating'], Number);
		check(review['review'], String);
		if(review['rating'] > 5 || review['rating'] < 1) throw new Meteor.Error('invalid value for rating');
		// Set default values
		review['date'] = new Date();
		// If constraints satisfied, update title, rating, review and date of review
		Reviews.update({'_id' : review['_id']}, {
			$set : {
				'title' : review['title'],
				'rating' : review['rating'],
				'review' : review['review'],
				'date' : review['date']
			}
		});
		return true;
	},

	// Deletes an existing review
	'reviews.delete': (id) => {

	},
});