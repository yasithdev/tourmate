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
 constructor(tourist, tourprovider, services, startDate, endDate, message){
 	this.tourist = tourist;
 	this.tourprovider = tourprovider;
 	this.services = services;
 	this.startDate = startDate;
 	this.endDate = endDate;
 	this.status = ReservationStatus.Pending;
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