import { check } from 'meteor/check';

export class Message {
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
	constructor(sender, recipient, reservation, messagetext){

		check(sender, String);
		check(recipient, String);
		check(reservation, String);
		check(messagetext, String);

		this.sender = sender;
		this.recipient = recipient;
		this.reservation = reservation;
		this.messagetext = messagetext;
		this.senderVisible = true;
		this.recipientVisible = true;
		this.unread = true;
		this.date = new Date();
	}
}