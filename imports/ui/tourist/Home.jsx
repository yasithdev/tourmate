import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import {FluidContainer, Row, Col, Img, NavButton} from '../common/Components';

// home page for tourist
export class Home extends React.Component {
	render(){
		return (
			<FluidContainer>
				<Row>
					<Col width="12"><h2>{this.props.currentUser.profile.name}</h2></Col>
				</Row>
				<Row>
					<Col width="2"><Img source={'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-tech-guy.png'}/></Col>
					{<Col width="10"><p>{this.props.currentUser.emails[0].address}</p></Col>}
				</Row>
				<Row>
					<NavButton to="/tourist/">Update Profile</NavButton>
				</Row>
			</FluidContainer>
		);
	}
}
 
export default HomeContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, Home);