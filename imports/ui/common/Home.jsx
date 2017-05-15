import React from 'react';
import {Jumbotron, FluidContainer} from './Components';

export default class Home extends React.Component {
	render(){
		return (
			<FluidContainer>
				<Jumbotron>
					<h2>TourMate</h2>
					<p>TourMate is lorem ipsum</p>
				</Jumbotron>
			</FluidContainer>
		);
	}
}