import { check } from 'meteor/check';

export class Review {
/* -------------------
 * |--- reservation : id
 * |--- title : String
 * |--- rating : int (between 1 and 5 inclusive)
 * |--- review : String
 * |--- date : Date
 */
	constructor(reservation, title, rating, review){
		check(reservation, String);
		check(title, String);
		check(rating, Number);
		if(rating < 0 || rating > 5) throw new Meteor.error('rating must be between 0 and 5');
		check(review, String);

		this.reservation = reservation;
		this.title = title;
		this.rating = rating;
		this.review = review;
		this.date = new Date();
	}
}