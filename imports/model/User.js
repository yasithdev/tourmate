import { check } from 'meteor/check';

export class User {
	/* -------------------
	 * |--- profile.name : String
	 * |--- username : String
	 * |--- password : String
	 * |--- email : String
	 * |--- profile.role : String
	 */
	constructor(name, username, password, email, role){
		check(name, String);
		check(username, String);
		check(password, String);
		check(email, String);
		check(role, String);

		if(Object.values(UserRole).indexOf(role) == -1) throw new Meteor.Error('role cannot be a value outside of UserRole');

		this.profile = {'name' : name, 'role' : role};
		this.username = username;
		this.password = password;
		this.email = email;
	}
}

export const UserRole = {
	'Admin' : 'admin',
	'TourProvider' : 'tour-provider',
	'Tourist' : 'tourist'
}