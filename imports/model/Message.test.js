import { Message } from './Message.js';
import { check } from 'meteor/check';
import { Match } from 'meteor/match';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
/* -------------------
 * |--- sender : id
 * |--- recipient : id
 * |--- reservation : id
 * |--- messagetext : String
 * |--- senderVisible : bool
 * |--- recipientVisible : bool
 * |--- unread : bool
 * |--- date : date
 */

// if (Meteor.isServer) {

	describe('Messages Unit Tests', function() {

		//@Test - Data
		it('message should not be created if data types do not match (Sender)', function(){
			assert.throws(function() {
				var sender = null; // The Invalid parameter
				var recipient = Random.id();
				var reservation = Random.id();
				var messagetext = "sample message text";
				let message = new Message(sender, recipient, reservation, messagetext);
			}, Match.Error);
		});

			//@Test - Data
		it('message should not be created if data types do not match (Recipient)', function(){
			assert.throws(function() {
				var sender = Random.id(); // The Invalid parameter
				var recipient = null;
				var reservation = Random.id();
				var messagetext = "sample message text";
				let message = new Message(sender, recipient, reservation, messagetext);
			}, Match.Error);
		});

			//@Test - Data
		it('message should not be created if data types do not match (Reservation)', function(){
			assert.throws(function() {
				var sender = Random.id(); // The Invalid parameter
				var recipient = Random.id();
				var reservation = null;
				var messagetext = "sample message text";
				let message = new Message(sender, recipient, reservation, messagetext);
			}, Match.Error);
		});

			//@Test - Data
		it('message should not be created if data types do not match (MessageText)', function(){
			assert.throws(function() {
				var sender = Random.id(); // The Invalid parameter
				var recipient = Random.id();
				var reservation = Random.id();
				var messagetext = null;
				let message = new Message(sender, recipient, reservation, messagetext);
			}, Match.Error);
		});

		//@Test - Data
		it('message should be created if all data types match', function(){
			assert.doesNotThrow(function() {
				var sender = Random.id(); // The Invalid parameter
				var recipient = Random.id();
				var reservation = Random.id();
				var messagetext = null;
				let message = new Message(sender, recipient, reservation, messagetext);
				expect(message).toExist();
			}, Error);
		});
	});

// }