import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

/* 'messages' Schema
 * -------------------
 * |--- sender : id
 * |--- recipient : id
 * |--- reservation : id
 * |--- messagetext : String
 * |--- senderVisible : bool
 * |--- recipientVisible : bool
 * |--- unread : bool
 * |--- date : date
 */

if (Meteor.isServer) {
	// Only return messages where the current user is either sender or recipient
	Meteor.publish('messages', function() {
		let user = Meteor.users.findOne({'_id' : this.userId});
		if(!user) return Messages.find({null});
		if(user.profile.role == 'admin') return Messages.find({});
		return Messages.find({$or: [{'sender': this.userId}, {'recipient': this.userId}, {'recipient' : 'broadcast'}]});
	});
};

Meteor.methods({

	// Inserts a new message
	'messages.insert': (message) => {
		// Validation
		check(message['sender'], String);
		if(message['sender'] != Meteor.userId()) throw new Meteor.Error("userId does not match sender");
		check(message['recipient'], String);
		check(message['reservation'], String);
		check(message['messagetext'], String);
		// Assign default properties
		message['senderVisible'] = true;
		message['recipientVisible'] = true;
		message['unread'] = true;
		message['date'] = new Date();
		// Insert into database
		Messages.insert(message);
		return true;
	},

	// Hides a message from current user of Deletes it
	'messages.remove': (id) => {
		check(id, String);
		let message = Messages.findOne(id);
		if(message == null) return;

		let isSender = (message.sender == Meteor.userId());
		let isRecipient = (message.recipient == Meteor.userId());

		if(isSender){
			if(message.recipientVisible) Messages.update({'_id' : id}, {$set : {'senderVisible' : false}});
			else Messages.delete({'_id' : id});
			return true;
		}

		if(isRecipient){
			if(message.senderVisible) Messages.update({'_id' : id}, {$set : {'recipientVisible' : false}});
			else Messages.delete({'_id' : id});
			return true;
		}

		else throw Meteor.Error('current user is not either sender nor recipient of this message');
	},
});