import { check } from 'meteor/check';

class User {
	constructor(name, username, password, email, role){
		this.profile = {'name' : name, 'role' : role};
		this.username = username;
		this.password = password;
		this.email = email;
	}
}