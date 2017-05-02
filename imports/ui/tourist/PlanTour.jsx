import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

// contact us page for tourist
export class PlanTour extends React.Component {
	render(){
		return (
			<div>
				<h2> Plan Tour </h2>
			</div>
		);
	}
}

export default PlanTourContainer = createContainer((props) => {
	return({
		currentUser: Meteor.user(),
		
	});
}, PlanTour);