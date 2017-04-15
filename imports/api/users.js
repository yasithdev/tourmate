import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({

	// Inserts a new user into database
	'users.createUser': (user) => {
		check(user.username, String);
		check(user.profile.role, String);
		check(user.password, String);
		check(user.email, String);
		Accounts.createUser(user);
		return true;
	},
});