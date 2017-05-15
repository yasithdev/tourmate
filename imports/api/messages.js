import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
	Meteor.publish('messages', function() {
		let userId = this.userId();
		return Messages.find(
			{
    		$or : {'sender' : userId,'recipient' : userId}
    	}
		);
	});
};

Meteor.methods({

	// Inserts a new message
	'messages.insert': (sender, recipient, reservation, message) => {
		check(sender, String);
		if(sender != Meteor.userId()) throw new Meteor.error("userId does not match sender");
		check(recipient, String);
		check(reservation, String);
		check(message, String);

		let msg = {
			'sender' : sender,
			'recipient' : recipient,
			'senderVisible' : true,
			'recipientVisible' : true,
			'reservation' : reservation,
			'message' : message,
			'date' : new Date()
		}
		Messages.insert(msg);
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

		else throw Meteor.error('current user is not either sender nor recipient of this message');
	},
});