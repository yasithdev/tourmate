import { Reservation } from './Reservation.js';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
/* -------------------
 * |--- tourist : id
 * |--- tour-provider : id
 * |--- services : Array
 * |--- startDate : date
 * |--- endDate : date
 * |--- status : string (pending, accepted, completed, pendingcancel, canceled, rejected, disputed)
 * |--- message : string
 */
import { ReservationStatus } from './Reservation.js';

// if (Meteor.isServer) {

  describe('Reservation Unit Tests', function() {

    //@Test - Data
    it('reservation should not be created if data types do not match (Tourist)', function(){
      assert.throws(function() {
        var tourist = null;
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should not be created if data types do not match (Tour Provider)', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = null;
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should not be created if data types do not match (Services)', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = null;
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should not be created if services array is empty', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = [];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Meteor.error, 'services cannot be empty');
    });

    //@Test - Data
    it('reservation should not be created if data types do not match (StartDate)', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = null;
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should not be created if data types do not match (EndDate)', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = null;
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should not be created if Start Date greater than End date', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,06);
        var endDate = new Date(2015,05,05);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Meteor.error, 'start cannot be date greater than end date');
    });

    //@Test - Data
    it('reservation should not be created if data types do not match (Status)', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2017,05,06);
        var status = null;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should not be created if status is not a value in ReservationStatus', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2017,05,06);
        var status = "test_status";
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Meteor.error, 'reservation status cannot be a value outside of ReservationStatus');
    });

    //@Test - Data
    it('reservation should not be created if data types do not match (Message)', function(){
      assert.throws(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = null;
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
      }, Match.error);
    });

    //@Test - Data
    it('reservation should be created if all constraints satisfied', function(){
      assert.doesNotThrow(function() {
        var tourist = Random.id();
        var tourprovider = Random.id();
        var services = ['test_service_1' , 'test_service_2'];
        var startDate = new Date(2017,05,05);
        var endDate = new Date(2015,05,06);
        var status = ReservationStatus.Pending;
        var message = "sample message text";
        let reservation = new Reservation(tourist, tourprovider, services, startDate, endDate, status, message);
        expect(message).toExist();
      }, Error);
    });

  });

// }