import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function() {
    return Messages.find({userId: this.userId});
  });
}

Meteor.methods({

	// Inserts a new message
	'messages.insert': (recipient, message) => {
		check(recipient, String);
		check(recipient, String);
	},

	// Deletes an existing message
	'messages.delete': (id) => {

	},
});