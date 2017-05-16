import React from 'react';

import {FluidContainer} from "./Components";

// About page contents (Public)
export default class About extends React.Component {
	render(){
		return (
			<FluidContainer>
			<div className="well">
				<h2>Status of the Project</h2>
				<p>This project is still under development, but you are free to try TourMate and provide us feedback</p>

				<h2>Authors</h2>
				<p>Yasith Jayawardana</p>

				<h2>Technologies Used</h2>
				<ul>
					<li>Meteor - Full-stack Framework</li>
					<li>React.JS - Front-end Framework</li>
					<li>Node.JS - Server</li>
					<li>NPM - Package Manager</li>
				</ul>
			</div>
			</FluidContainer>
		);
	}
}