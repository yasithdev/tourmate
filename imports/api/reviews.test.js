import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { check } from 'meteor/check';
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';
import { assert } from 'meteor/practicalmeteor:chai';

import { Reservations } from './reservations.js';
/* -------------------
 * |--- tourist : id
 * |--- tour-provider : id
 * |--- services : Array
 * |--- startDate : date
 * |--- endDate : date
 * |--- status : string (pending, accepted, completed, pendingcancel, canceled, rejected, disputed)
 * |--- message : string
 */
import { Reviews } from './reviews.js';
/* -------------------
 * |--- reservation : id
 * |--- title : String
 * |--- rating : int (between 1 and 5 inclusive)
 * |--- review : String
 * |--- date : Date
 */

// if (Meteor.isServer) {

	describe('Reviews Module (DB)', function() {

		// Parameters for reservation
		const tourist = Random.id();
		const tour_provider = Random.id();
		const services = ['test_service_1', 'test_service_2'];
		const startDate = new Date(2017, 05, 05);
		const endDate = new Date(2017, 05, 06);
		const status = "test_status";
		const message = "test_message";

		// Parameters for review
		const userId = Random.id();
		const title = "test_title";
		const rating = (Random.fraction() * 1000).toFixed() % 6;
		const review = "test_review";
		const date = new Date();

		let updaterole = function(role) {
			Meteor.users.update({_id: userId}, {'profile.role': role});
		}

		let reviewId;

		beforeEach(() => {

			// --------------------------
			// Create a new user account with username test and make sure its properly inserted
			let testUserId = Accounts.createUser( {_id: userId, profile : {role : 'test'}, 'username' : 'test_user' } );
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
			// Clear all Reviews and reservations before testing
			Reservations.remove({});
			Reviews.remove({});

			// --------------------------
			// Insert a reservation to map to review
			reservation = {
				'tourist' : tourist,
				'tour-provider' : tour_provider,
				'services' : services,
				'startDate' : startDate,
				'endDate' : endDate,
				'status' : status,
				'message' : message,
			};
			reservationId = Reservations.insert(reservation);
			isDefined(reservationId);

			// --------------------------
			// Insert a message into database
			reviewId = Reviews.insert({
				'reservation' : reservationId,
				'title' : title,
				'rating' : rating,
				'review' : review,
				'date' : date
			});
			isDefined(reviewId);

		});

		afterEach(() => {

			//remove the user in the db
			Meteor.users.remove({_id : userId});
			// restore user Meteor.user() function
			Meteor.user = userFct;
			Meteor.userId = userFct2;

		});

		//@Test - Insert
		it('can insert reviews if user is a tourist', function(done) {
			updaterole('tourist');
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const insertReview = Meteor.server.method_handlers['reviews.insert'];

			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };

			// Run the method with `this` set to the fake invocation
			insertReview.apply(invocation, [reviewId]);

			// Verify that the method has actually added the reservation (One record already exists so assert equal to 2)
			assert.equal(Reviews.find().count(), 2);
			done();
		});

		//@Test - Insert
		it('cannot insert review if user is not a tourist', function(done) {
			// Find the internal implementation of the task method so we can
			// test it in isolation
			const insertReview = Meteor.server.method_handlers['reviews.insert'];

			// Set up a fake method invocation that looks like what the method expects
			const invocation = { userId };

			assert.throws(function() {
				insertReview.apply(invocation, [reviewId]);
			}, Meteor.error, 'current user is not a tourist');
			done();
		});

		//@Test - Access
		it('can access review made by user when user is a tourist', function(done){
			updaterole('tourist');
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ userId });
			// Check if sender has access to the message
			collector.collect('reviews', (collections) => {
				chai.assert.equal(collections.reviews.length, 1);
				done();
			});
		});

		//@Test - Access
		it('can access review made for the user when user is a tour provider', function(done){
			updaterole('tour-provider');
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ userId });
			// Check if recipient has access to the message
			collector.collect('reviews', (collections) => {
				chai.assert.equal(collections.reviews.length, 1);
				done();
			});
		});

		//@Test - Access
		it('cannot access review when user is neither its tourist nor its tour provider', function(done){
			// Create a publication collector where user is the sender
			var randomuserId = Random.id();
			const collector = new PublicationCollector({ 'userId' : randomuserId });
			// Check if sender has access to their message
			collector.collect('reviews', (collections) => {
				chai.assert.equal(collections.reviews.length, 0);
				done();
			});
		});

		//@Test - Data
		it('loads Reviews with correct data values', function(done){
			updaterole('tourist');
			// Create a publication collector where user is the sender
			const collector = new PublicationCollector({ userId });
			// Check if sender has access to the message
			collector.collect('Reviews', (collections) => {
				/* 'reviews' Schema
				 * -------------------
				 * |--- reservation : id
				 * |--- title : String
				 * |--- rating : int (between 1 and 5 inclusive)
				 * |--- review : String
				 * |--- date : Date
				 */
				chai.assert.equal(collections.reviews.length, 1);

				const review = collections.Reviews[0];
				expect(review.reservation).to.be.a('string');
				expect(review.title).to.be.a('string');
				expect(review.rating).to.be.a('number');
				expect(review.date).to.be.a('date');
				done();
			});
		});

	});
	// End of isServer block
// }