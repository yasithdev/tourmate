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
		if(user.profile.role == "tour-provider" && !user.profile.subscription) user.profile[subscription] = "Free";
		Accounts.createUser(user);
		return true;
	},

	'users.profile.update': (iProfile) => {
		check(iProfile.role, String);

		check(iProfile.name, String);
		check(iProfile.url, String);
		check(iProfile.bio, String);
		check(iProfile.avatar, Object);

		if(!Meteor.user()) throw new Meteor.error('User is undefined');
		Meteor.users.update(Meteor.userId(), {$set : {profile : iProfile}});
		return true;
	},
});