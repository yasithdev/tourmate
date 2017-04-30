import {Meteor} from 'meteor/meteor';
import React from 'react';
import {FluidContainer, Row, Col, Img, NavButton} from '../common/Components';

// home page for tourist
export default class Home extends React.Component {
	render(){
		return (
			<FluidContainer>
				<Row>
					<Col width="12"><h1>Home</h1></Col>
				</Row>
				<Row>
					<Col width="2"><Img source={'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-tech-guy.png'}/></Col>
					{<Col width="10"><p>{this.props.user.username} {this.props.user.emails[0].address}</p></Col>}
				</Row>
				<Row>
					<NavButton to="/">Update Profile</NavButton>
				</Row>
			</FluidContainer>
		);
	}
}