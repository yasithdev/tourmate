import { User } from './User.js';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
/* -------------------
 * |--- profile.name : String
 * |--- username : String
 * |--- password : String
 * |--- email : String
 * |--- profile.role : String
 */
 import { UserRole } from './User.js';

// if (Meteor.isServer) {

  describe('User Unit Tests', function() {
  	//@Test - Data
    it('user should not be created if data types do not match (name)', function(){
      assert.throws(function() {
        var name = null;
        var username = "test_username";
        var password = Random.secret;
        var email = "test@test.com";
        var role = UserRole.Tourist;
        let user = new User(name, username, password, email, role);
      }, Match.error);
    });

    //@Test - Data
    it('user should not be created if data types do not match (username)', function(){
      assert.throws(function() {
        var name = Random.id();
        var username = null;
        var password = Random.secret;
        var email = "test@test.com";
        var role = UserRole.Tourist;
        let user = new User(name, username, password, email, role);
      }, Match.error);
    });

    //@Test - Data
    it('user should not be created if data types do not match (password)', function(){
      assert.throws(function() {
        var name = Random.id();
        var username = "test_username";
        var password = null;
        var email = "test@test.com";
        var role = UserRole.Tourist;
        let user = new User(name, username, password, email, role);
      }, Match.error);
    });

    //@Test - Data
    it('user should not be created if data types do not match (email)', function(){
      assert.throws(function() {
        var name = Random.id();
        var username = "test_username";
        var password = Random.secret;
        var email = null;
        var role = UserRole.Tourist;
        let user = new User(name, username, password, email, role);
      }, Match.error);
    });

    //@Test - Data
    it('user should not be created if data types do not match (role)', function(){
      assert.throws(function() {
        var name = Random.id();
        var username = "test_username";
        var password = Random.secret;
        var email = "test@test.com";
        var role = null;
        let user = new User(name, username, password, email, role);
      }, Match.error);
    });

    //@Test - Data
    it('user should not be created if data types do not match (role)', function(){
      assert.throws(function() {
        var name = Random.id();
        var username = "test_username";
        var password = Random.secret;
        var email = "test@test.com";
        var role = "invalid_role";
        let user = new User(name, username, password, email, role);
      }, Match.error);
    });


    //@Test - Data
    it('user should be created if all data types match', function(){
      assert.doesNotThrow(function() {
        var name = Random.id();
        var username = "test_username";
        var password = Random.secret;
        var email = "test@test.com";
        var role = UserRole.Tourist;
        let user = new User(name, username, password, email, role);
        expect(user).toExist();
      }, Error);
    });
  });

// }