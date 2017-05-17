import {Meteor} from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import {FluidContainer, Row, Col, Img, NavButton} from '../common/Components';

/* ------------------------------------------------------------ *
 * Homepage for tour provider  -------------------------------- *
 * ------------------------------------------------------------ */
export class Home extends React.Component {
	render(){
		return (
			<FluidContainer>
				<div className="well">
					<h2>{this.props.currentUser.profile.name}</h2>
					<Row>
						<Col widthXS="6">
							<h2>Tourists</h2>
							<ul>
							{this.props.tourists.map((tourist) => (<li key={tourist['_id']}>{tourist.profile.name}</li>))}
							</ul>
						</Col>
						<Col widthXS="6">
							<h2>Tour Providers</h2>
							<ul>
								{this.props.tourproviders.map((tourprovider) => (<li key={tourprovider['_id']}>{tourprovider.profile.name}</li>))}
							</ul>
						</Col>
					</Row>
				</div>
			</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Homepage ----------------------- *
 * ------------------------------------------------------------ */
export default HomeContainer = createContainer(function(props) {
	Meteor.subscribe('allusers');
  return {
    currentUser: Meteor.user(),
    tourists : Meteor.users.find({'profile.role' : 'tourist'}).fetch(),
    tourproviders : Meteor.users.find({'profile.role' : 'tour-provider'}).fetch(),
  };
}, Home);