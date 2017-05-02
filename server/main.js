import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base'

import '../imports/api/messages.js';
import '../imports/api/reservations.js';
import '../imports/api/reviews.js';
import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({

	// Inserts a new user into database
	'users.createUser': (user) => {
		check(user.username, String);
		check(user.profile.role, String);
		check(user.password, String);
		check(user.email, String);
		if(user.profile.role == "tour-provider" && user.profile['subscription'] === undefined) user.profile['subscription'] = "Free";
		console.log(user);
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

	'users.username.isAvailable': (uname) => {
		check(uname, String);
		let user = Accounts.findUserByUsername(uname);
		return !(user != null);
	},
});

Meteor.publish("tourists", () => 
	Meteor.users.find(
		{'profile.role' : 'tourist'}, 
		{fields: {'profile': 1}}
	));

Meteor.publish("tour-providers", () => 
	Meteor.users.find(
		{'profile.role' : 'tour-provider'}, 
		{fields: {'profile.role': 1, 'profile.name': 1, 'profile.url': 1, 'profile.bio': 1, 'profile.avatar': 1, 'profile.services': 1}}
	));