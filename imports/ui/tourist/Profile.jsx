import { Meteor } from 'meteor/meteor';
import React from 'react';

// update profile information page for tourist
export default class Profile extends React.Component
{
    constructor(props) {
        super(props);
        // register handlers for form submit
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // this method is invoked when user submits the profile update form
    handleSubmit(event){
        event.preventDefault();
        // Load content from UI to variables
        let iName = $("#inputName").val();
        let iUrl = $("#inputUrl").val();
        let iBio = $("#inputBio").val();
        // Load avatar (profile picture).
        // If the profile picture was not changed, keep existing profile picture
        let iAvatar = $("#inputAvatar").val();
        iAvatar = iAvatar === "" ? this.props.user.profile.avatar : iAvatar;

        // create object with all profile parameters
        let iProfile = {
            name: iName,
            url: iUrl,
            bio: iBio,
            avatar: iAvatar,
            role: "tourist"
        };
        console.log(iProfile);
        // call server method to update user profile, and pass the created object
        Meteor.call('updateUserProfile',iProfile);

        // if successful, refresh the current page
        if(this.props.history != null) this.props.history.push('');
    }

    // UI layout for editing user profile information
    render(){
        return(
			<div>
				<h1>Personal Information</h1>
                {/*{Form content}*/}
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="inputName">Name</label>
						<span className="input-group-addon" style={{"fontStyle": "italic"}}/>
						<input type="text" className="form-control" id="inputName" placeholder="Name"/>
					</div>
					<div className="form-group">
						<label htmlFor="inputWebsite">Web Address</label>
						<input type="url" className="form-control" id="inputUrl" placeholder="Web Address"/>
					</div>
					<div className="form-group">
						<label htmlFor="inputBio">Bio</label>
						<input type="text" className="form-control" id="inputBio" placeholder="Bio"/>
					</div>
					<div className="form-group">
						<label htmlFor="inputBio">Profile Picture</label>
						<input type="file" className="form-control" id="inputAvatar" accept="image/*"/>
					</div>
					<button type="submit" className="btn btn-default" id="submitButton">Submit</button>
				</form>
			</div>
        );
    }

    // Load user profile content with current parameters from database after form is rendered in html
    componentDidMount(){
        // set initial values for all components
        let user = this.props.user;
        $('#inputName').val(user.profile.name);
        $('#inputUrl').val(user.profile.url);
        $('#inputBio').val(user.profile.bio);
        // $('#inputAvatar').val(user.profile.avatar);
        // This method is commented out because form does not allow assigning file inputs programmatically
    }
};