import { Review } from './Review.js';
import { check } from 'meteor/check';
import { Match } from 'meteor/match';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
/* -------------------
 * |--- rating : id
 * |--- title : String
 * |--- rating : int (between 1 and 5 inclusive)
 * |--- review : String
 * |--- date : Date
 */
// if (Meteor.isServer) {

  describe('Review Unit Tests', function() {

    //@Test - Data
    it('review should not be created if data types do not match (reservation)', function(){
      assert.throws(function() {
        var reservation = null;
        var title = "review_title";
        var rating = (Random.fraction() * 1000).toFixed() % 6;
        var reviewtext = "sample review text";
        let review = new Review(reservation, title, rating, reviewtext);
      }, Match.Error);
    });

    //@Test - Data
    it('review should not be created if data types do not match (title)', function(){
      assert.throws(function() {
        var reservation = Random.id();
        var title = null;
        var rating = (Random.fraction() * 1000).toFixed() % 6;
        var reviewtext = "sample review text";
        let review = new Review(reservation, title, rating, reviewtext);
      }, Match.Error);
    });

    //@Test - Data
    it('review should not be created if data types do not match (rating)', function(){
      assert.throws(function() {
        var reservation = Random.id();
        var title = "review_title";
        var rating = null;
        var reviewtext = "sample review text";
        let review = new Review(reservation, title, rating, reviewtext);
      }, Match.Error);
    });

    //@Test - Data
    it('review should not be created if rating is out of range', function(){
      assert.throws(function() {
        var reservation = Random.id();
        var title = "review_title";
        var rating = 6;
        var reviewtext = "sample review text";
        let review = new Review(reservation, title, rating, reviewtext);
      }, Meteor.Error, 'rating must be between 0 and 5');
    });

    //@Test - Data
    it('review should not be created if data types do not match (reviewtext)', function(){
      assert.throws(function() {
        var reservation = Random.id();
        var title = "review_title";
        var rating = (Random.fraction() * 1000).toFixed() % 6;
        var reviewtext = null;
        let review = new Review(reservation, title, rating, reviewtext);
      }, Match.Error);
    });

    //@Test - Data
    it('review should be created if all data types match', function(){
      assert.doesNotThrow(function() {
        var reservation = Random.id();
        var title = "review_title";
        var rating = (Random.fraction() * 1000).toFixed() % 6;
        var reviewtext = "sample review text";
        let review = new Review(reservation, title, rating, reviewtext);
        expect(review).toExist();
      }, Error);
    });

  });

// }