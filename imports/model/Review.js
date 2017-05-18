export class Review {
/* -------------------
 * |--- reservation : id
 * |--- title : String
 * |--- rating : int (between 1 and 5 inclusive)
 * |--- review : String
 * |--- date : Date
 */
	constructor(reservation, title, rating, review){
		this.reservation = reservation;
		this.title = title;
		this.rating = rating;
		this.review = review;
		this.date = new Date();
	}
}