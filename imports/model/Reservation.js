import { check } from 'meteor/check';

export class Reservation {
/* -------------------
 * |--- tourist : id
 * |--- tour-provider : id
 * |--- services : Array
 * |--- startDate : date
 * |--- endDate : date
 * |--- status : string (pending, accepted, completed, pendingcancel, canceled, rejected, disputed)
 * |--- message : string
 */
 constructor(tourist, tourprovider, services, startDate, endDate, status, message){
 	check(tourist, String);
 	check(tourprovider, String);
 	check(services, Array);
 	check(startDate, Date);
 	check(endDate, Date);
 	check(status, String);
 	check(message, String);

 	if (services.Length == 0) throw new Meteor.error('services cannot be empty');
 	if(endDate < startDate) throw new Meteor.error('start cannot be date greater than end date');
 	if(Object.values(ReservationStatus).indexOf(status) == -1) throw new Meteor.error('reservation status cannot be a value outside of ReservationStatus')

 	this.tourist = tourist;
 	this.tourprovider = tourprovider;
 	this.services = services;
 	this.startDate = startDate;
 	this.endDate = endDate;
 	this.status = status;
 	this.message = message;
	}
}

export const ReservationStatus = {
	'Pending' : 'pending',
	'Accepted' : 'accepted',
	'Completed' : 'completed',
	'PendingCancel' : 'pendingcancel',
	'Canceled' : 'canceled',
	'Rejected' : 'rejected',
	'Disputed' : 'disputed'
};