import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Match } from 'meteor/match';
import { check } from 'meteor/check';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { assert } from 'meteor/practicalmeteor:chai';

import { Messages } from './messages.js';
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

	describe('Messages Module (DB)', function() {

		// Parameters for message
		const userId = Random.id();
		const sender = 'test_sender';
		const recipient = 'test_recipient';
		const reservation = 'test_reservation';

		let updaterole = function(role) {
			Meteor.users.update({_id: userId}, {'profile.role': role});
		}

		let messageId;

		beforeEach(() => {

			// --------------------------
			// Create a new user account with username test and make sure its properly inserted
			try {
				let testUserId = Accounts.createUser( {_id: userId, profile : {role : 'test'}, 'username' : 'test_user' } );
				// isDefined(testUserId);
			} catch(e){

			}
			// Keep a copy of original Meteor.user function
			userFct = Meteor.user;
			userFct2 = Meteor.userId;
			// Stub the alternate function
			Meteor.user = function(){
				const users = Meteor.users.find({_id: userId}).fetch();
				if (!users || users.length > 1)
					throw new Error("Meteor.user() mock cannot find user by userId.");
				return users[0];
			};
			Meteor.userId = function(){
				return userId;
			};

			// --------------------------
			// Clear all messages before testing
			Messages.remove({});

			// --------------------------
			// Insert a message into database
			messageId = Messages.insert({
				'sender' : sender,
				'recipient' : recipient,
				'reservation' : reservation,
				'senderVisible' : true,
				'recipientVisible' : true,
				'unread' : true,
				'date' : new Date(),
			});
			// isDefined(messageId);

		});

		afterEach(() => {

			//remove the user in the db
			Meteor.users.remove({_id : userId});
			// restore user Meteor.user() function
			Meteor.user = userFct;
			Meteor.userId = userFct2;

		});

		//@Test - Delete
		it('can delete messages sent by user', function(done) {
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const deleteMessage = Meteor.server.method_handlers['messages.remove'];

			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };

			// Run the method with `this` set to the fake invocation
			deleteMessage.apply(invocation, [messageId]);

			// Verify that the method has actually deleted the message
			assert.equal(Messages.find().count(), 0);
			done();
		});

		//@Test - Delete
		it('cannot delete messages sent by another user', function(done) {
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const deleteMessage = Meteor.server.method_handlers['messages.remove'];

			// Set up a fake method invocation that looks like what the method expects, but with different userId
			let randomuserid = Random.id();
			const invocation = { 'userId' : randomuserid };

			assert.throws(function() {
				deleteMessage.apply(invocation, [messageId]);
			}, Meteor.Error, 'current user is not either sender nor recipient of this message');

			// Verify that the method has actually deleted the message
			assert.equal(Messages.find().count(), 1);
			done();
		});

		//@Test - Access
		it('can access message when loaded by its sender', function(done){
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ 'userId' : sender });
			// Check if sender has access to the message
			collector.collect('messages', (collections) => {
				assert.equal(collections.messages.length, 1);
				done();
			});
		});

		//@Test - Access
		it('can access message when loaded by its recipient', function(done){
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ 'userId' : recipient });
			// Check if recipient has access to the message
			collector.collect('messages', (collections) => {
				assert.equal(collections.messages.length, 1);
				done();
			});
		});

		//@Test - Access
		it('cannot access message belonging to other users', function(done){
			// Create a publication collector where user is the sender
			var randomuserId = Random.id();
			const collector = new PublicationCollector({ 'userId' : randomuserId });
			// Check if sender has access to their message
			collector.collect('messages', (collections) => {
				assert.equal(collections.messages.length, 0);
				done();
			});
		});

		//@Test - Data
		it('loads message with correct data values', function(done){
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ sender });
			// Check if sender has access to the message
			collector.collect('messages', (collections) => {
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
				assert.equal(collections.messages.length, 1);

				const message = collections.Messages[0];
				expect(message.sender).to.be.a('string');
				expect(message.recipient).to.be.a('string');
				expect(message.reservation).to.be.a('string');
				expect(message.messagetext).to.be.a('string');
				expect(message.senderVisible).to.be.a('boolean');
				expect(message.recipientVisible).to.be.a('boolean');
				expect(message.unread).to.be.a('boolean');
				expect(message.date).to.be.a('date');
				done();
			});
		});

	});
	// End of isServer block
// }