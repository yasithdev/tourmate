import { Meteor } from 'meteor/meteor';
import React from 'react';

// update profile information page for tourist
export default class Profile extends React.Component
{
    constructor(props) {
        super(props);
    }
    
    /* this method is invoked when currentUser submits the profile update form */
    handleSubmit(event){
        event.preventDefault();

        /* Load content from UI to variables */
        let iName = this.refs.inputName.value;
        let iUrl = this.refs.inputUrl.value;
        let iBio = this.refs.inputBio.value;
        let iAvatar = $("#inputAvatar").val();
        iAvatar = iAvatar === "" ? this.props.currentUser.profile.avatar : iAvatar;

        /* create object with all profile parameters */
        let iProfile = {
            name: iName,
            url: iUrl,
            bio: iBio,
            avatar: iAvatar,
            role: this.props.currentUser.role
        };

        /* call server method to update currentUser profile, and pass the created object */
        Meteor.call('users.profile.update',iProfile);

        /* if successful, refresh the current page */
        this.props.history.push(this.props.history.pop());
    }

    /* UI layout for editing currentUser profile information */
    render(){
        return(
			<div>
				<h1>Profile - {this.props.currentUser.username}</h1>
                {/* Form content */}
				<Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormInput type="url" placeholder="Name" ref="inputName"/>
                    <FormInput type="url" placeholder="Webpage URL" ref="inputUrl"/>
                    <FormInput type="text" placeholder="Bio" ref="inputBio"/>
					<FormInput type="file" accept="image/*" placeholder="Avatar" ref="inputAvatar"/>
					<FormButton>Submit</FormButton>
				</Form>
			</div>
        );
    }

    /* Load currentUser profile content with current parameters from database after form is rendered in html */
    componentDidMount(){
        // set initial values for all components
        let currentUser = this.props.currentUser;
        this.refs.inputName.value = currentUser.profile.name;
        this.refs.inputUrl.value = currentUser.profile.url;
        this.refs.inputBio.value = currentUser.profile.bio;
        // this.refs.inputAvatar.value = currentUser.profile.avatar; --commented out because form does not allow assigning file inputs programmatically
    }
};