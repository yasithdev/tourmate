import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import { Form, FormInput, FormButton, FormCheckboxGroup, FormRadioButtons} from '../common/Components';

// update profile information page for tourist
export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.availableServices = ['Vehicle Rent', 'Tours', 'Tour Guides'];
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
        let iServices = this.refs.inputServices.state;
        let iSubscription = this.refs.inputSubscription.state.value;

        /* create object with all profile parameters */
        let iProfile = {
            role: this.props.currentUser.profile.role,

            name: iName,
            url: iUrl,
            bio: iBio,
            avatar: iAvatar,
            services: iServices,
            subscription: iSubscription
        };

        /* call server method to update currentUser profile, and pass the created object */
        Meteor.call('users.profile.update', iProfile, (error, result) => {
            /* if successful, refresh the current page */
            if(result) this.props.history.push("/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username);
        });
    }

    /* UI layout for editing currentUser profile information */
    render(){
        return(
            <Form title="Update Profile" onSubmit={this.handleSubmit.bind(this)}>
                <FormInput type="text" placeholder="Name" ref="inputName"/>
                <FormInput type="url" placeholder="Webpage URL" ref="inputUrl"/>
                <FormInput type="text" placeholder="Bio" ref="inputBio"/>
                <FormInput type="file" accept="image/*" placeholder="Avatar" ref="inputAvatar"/>
                <FormCheckboxGroup placeholder="Services" options={this.availableServices} selection={this.props.currentUser.profile.services} ref="inputServices"/>
                <FormRadioButtons placeholder="Subscription" ref="inputSubscription" buttons={{'Free': 'Free', 'Paid' : 'Paid'}} selection={this.props.currentUser.profile.subscription}/>
                <FormButton text="Submit"/>
            </Form>
        );
    }

    componentDidMount() {
        this.refs.inputName.refs.input.value = this.props.currentUser.profile.name == undefined ? '' : this.props.currentUser.profile.name;
        this.refs.inputUrl.refs.input.value = this.props.currentUser.profile.url == undefined ? '' : this.props.currentUser.profile.url;
        this.refs.inputBio.refs.input.value = this.props.currentUser.profile.bio == undefined ? '' : this.props.currentUser.profile.bio;

        for(service of this.availableServices){
          this.refs.inputServices.refs[service].checked = this.props.currentUser.profile.services[service];
        }
        // Services select
        // Subscription select
        // this.refs.inputAvatar.refs.input.value = this.props.currentUser.profile.avatar;
    }
};

export default ProfileContainer = createContainer((props) => {
    return {
        currentUser: Meteor.user(),
  };
}, Profile);