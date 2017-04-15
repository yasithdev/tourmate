import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Reviews = new Mongo.Collection('reviews');

if (Meteor.isServer) {
  Meteor.publish('reviews', () => {
    return Reviews.find({userId: this.userId});
  });
}

Meteor.methods({

	// Inserts a new review
	'reviews.insert': (review) => {

	},

	// Updates an existing review
	'reviews.update': (review) => {

	},
	
	// Deletes an existing review
	'reviews.delete': (id) => {
		
	},
});