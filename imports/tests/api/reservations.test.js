import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { PublicationCollector } from 'meteor/publication-collector';
import { assert } from 'meteor/practicalmeteor:chai';

import { Reservations } from '../../api/reservations.js';
/* -------------------
 * |--- tourist : id
 * |--- tour-provider : id
 * |--- services : Array
 * |--- startDate : date
 * |--- endDate : date
 * |--- status : string (pending, accepted, completed, pendingcancel, canceled, rejected, disputed)
 * |--- message : string
 */

if (Meteor.isServer) {

	describe('Reservations Module (DB)', function() {

		// Parameters for reservation
		const userId = Random.id();
		const tourist = Random.id();
		const tour_provider = Random.id();
		const services = ['test_service_1', 'test_service_2'];
		const startDate = new Date(2017, 05, 05);
		const endDate = new Date(2017, 05, 06);
		const status = "test_status";
		const message = "test_message";

		let updaterole = function(role) {
			Meteor.users.update({_id: userId}, {'profile.role', role});
		}

		let reservationId;

		beforeEach(() => {

			// --------------------------
			// Create a new user account with username test and make sure its properly inserted
			let testUserId = Accounts.createUser( {_id: userId, profile : {role : 'test'} } );
			isDefined(testUserId);
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
			// Clear all Reservations before testing
			Reservations.remove({});

			// --------------------------
			// Insert a message into database
			reservation = {
				'tourist' : tourist,
				'tour-provider' : tour_provider,
				'services' : services
				'startDate' : startDate
				'endDate' : endDate.
				'status' : status,
				'message' : message,
			};
			reservationId = Reservations.insert(reservation);
			isDefined(reservationId);

		});

		afterEach(() => {

			//remove the user in the db
			Meteor.users.remove({_id : userId});
			// restore user Meteor.user() function
			Meteor.user = userFct;
			Meteor.userId = userFct2;

		});


		//@Test - Insert
		it('can add reservations if user is a tourist', function(done) {
			updaterole('tourist');
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const insertReservation = Meteor.server.method_handlers['reservations.insert'];

			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };
			const reservationToInsert = reservation;
			// Set tourist to userId
			reservationToInsert.tourist = userId;

			// Run the method with `this` set to the fake invocation
			insertReservation.apply(invocation, [reservationToInsert]);

			// Verify that the method has actually added the reservation (One record already exists so assert equal to 2)
			assert.equal(Reservations.find().count(), 2);
			done();
		});

		//@Test - Insert
		it('cannot add reservation if user is not a tourist', function(done) {
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const insertReservation = Meteor.server.method_handlers['reservations.insert'];

			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };
			const reservationToInsert = reservation;
			// Set tourist to userId
			reservationToInsert.tourist = userId;

			assert.throws(function() {
				insertReservation.apply(invocation, [reservationToInsert]);
			}, Meteor.error, 'Current user is not a tourist');
			done();
		});

		//@Test - Insert
		it('cannot add reservation for another tourist', function(done) {
			updaterole('tourist');
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const insertReservation = Meteor.server.method_handlers['reservations.insert'];

			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };
			const reservationToInsert = reservation;
			// At this position the userId and tourist are different since they were randomly declared

			assert.throws(function() {
				insertReservation.apply(invocation, [reservationToInsert]);
			}, Meteor.error, 'Reservation not made for current user');
			done();
		});

		//@Test - Access
		it('can access reservations made by user when user is a tourist', function(done){
			updaterole('tourist');
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ 'userId' : tourist });
			// Check if tourist has access to reservation
			collector.collect('reservations', (collections) => {
				chai.assert.equal(collections.Reservations.length, 1);
				done();
			});
		});

		//@Test - Access
		it('can access reservation made for user when user is a tour provider', function(done){
			updaterole('tour-provider');
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ 'userId' : tour_provider });
			// Check if tour provider has access to reservation
			collector.collect('reservations', (collections) => {
				chai.assert.equal(collections.Reservations.length, 1);
				done();
			});
		});

		//@Test - Access
		it('cannot access reservation belonging to another user', function(done){
			// Create a publication collector where user is the sender
			var randomuserId = Random.id();
			const collector = new PublicationCollector({ 'userId' : randomuserId });
			// Check if random user has no access to reservation
			collector.collect('reservations', (collections) => {
				chai.assert.equal(collections.Reservations.length, 0);
				done();
			});
		});

		//@Test - Data
		it('loads reservation with correct data values', function(done){
			// Create a publication collector where user is the tourist
			const collector = new PublicationCollector({ 'userId' : tourist });
			// Check if sender has access to the message
			collector.collect('reservations', (collections) => {
				/* 'reservations' Schema
				 * -------------------
				 * |--- tourist : id
				 * |--- tour-provider : id
				 * |--- services : Array
				 * |--- startDate : date
				 * |--- endDate : date
				 * |--- status : string (pending, accepted, completed, pendingcancel, canceled, rejected, disputed)
				 * |--- message : string
				 */
				chai.assert.equal(collections.Reservations.length, 1);

				const reservation = collections.Reservations[0];
				expect(reservation.tourist).to.be.a('string');
				expect(reservation['tour-provider']).to.be.a('string');
				assert.isArray(reservation.services);
				expect(reservation.startDate).to.be.a('date');
				expect(reservation.endDate).to.be.a('date');
				expect(reservation.status).to.be.a('boolean');
				expect(reservation.message).to.be.a('string');
				done();
			});
		});

	});
	// End of isServer block
}