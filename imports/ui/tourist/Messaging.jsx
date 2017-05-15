import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {FluidContainer} from '../common/Components';

/* ------------------------------------------------------------ *
 * Messaging page for tourist --------------------------------- *
 * ------------------------------------------------------------ */
export class Messaging extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return( 
			<FluidContainer>
				<h2> Messaging </h2>
			</FluidContainer>
		);
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for Messaging ---------------------- *
 * ------------------------------------------------------------ */
export default MessagingContainer = createContainer(function(props) {
  return {
    currentUser: Meteor.user(),
  };
}, Messaging);