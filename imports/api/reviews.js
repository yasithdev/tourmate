import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Reviews = new Mongo.Collection('reviews');

/* 'reviews' Schema
 * -------------------
 * |--- writeDate : date
 * |--- title : String
 * |--- rating : int (between 1 and 10 inclusive)
 * |--- review : String
 */

if (Meteor.isServer) {
  Meteor.publish('reviews', function() {
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