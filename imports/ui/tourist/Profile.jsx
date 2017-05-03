import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import { Form, FormInput, FormButton} from '../common/Components';

/* ------------------------------------------------------------ *
 * Page to update profile information of tourist -------------- *
 * ------------------------------------------------------------ */
export class Profile extends React.Component {
	constructor(props) {
		super(props);
	}
	
	/* this method is invoked when currentUser submits the profile update form */
	handleSubmit(event){
		event.preventDefault();

		/* Load content from UI to variables */
		let iName = this.refs.inputName.refs.input.value;
		let iUrl = this.refs.inputUrl.refs.input.value;
		let iBio = this.refs.inputBio.refs.input.value;
		let iAvatar = this.refs.inputAvatar.refs.input.files;
		iAvatar = iAvatar === "" ? this.props.currentUser.profile.avatar : iAvatar;

		/* create object with all profile parameters */
		let iProfile = {
			role: this.props.currentUser.profile.role,

			name: iName,
			url: iUrl,
			bio: iBio,
			avatar: iAvatar,
		};

		console.log(iProfile);
		/* call server method to update currentUser profile, and pass the created object */
		Meteor.call('users.profile.update', iProfile, (error, result) => {
			/* if successful, refresh the current page */
      if(result) this.props.history.push("/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username);
		});
	}

	/* UI layout for editing currentUser profile information */
	render(){
		return(
			<Form title="Update profile" onSubmit={this.handleSubmit.bind(this)}>
				<FormInput type="text" placeholder="Name" ref="inputName"/>
				<FormInput type="url" placeholder="Webpage URL" ref="inputUrl"/>
				<FormInput type="text" placeholder="Bio" ref="inputBio"/>
				<FormInput type="file" accept="image/*" placeholder="Avatar" ref="inputAvatar"/>
				<FormButton text="Submit"/>
			</Form>
		);
	}

	componentDidMount() {
		this.refs.inputName.refs.input.value = this.props.currentUser.profile.name == undefined ? '' : this.props.currentUser.profile.name;
		this.refs.inputUrl.refs.input.value = this.props.currentUser.profile.url == undefined ? '' : this.props.currentUser.profile.url;
		this.refs.inputBio.refs.input.value = this.props.currentUser.profile.bio == undefined ? '' : this.props.currentUser.profile.bio;
	}
};

/* ------------------------------------------------------------ *
 * Reactive data container for Profile ------------------------ *
 * ------------------------------------------------------------ */
export default ProfileContainer = createContainer((props) => {
	return {
		currentUser: Meteor.user(),
  };
}, Profile);