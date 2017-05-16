import React from 'react';
import {Jumbotron, FluidContainer} from './Components';

export default class Home extends React.Component {
	render(){
		return (
			<FluidContainer>
				<Jumbotron>
					<h1>TourMate</h1>
					<p><strong>TourMate</strong> is a platform which connects Tourists with Tour Service providers, and boosts the productivity of tour reservations over traditional means.</p>
					<p>TourMate provides tourists with the ability to discover tour service providers online, and request services through them. It enables comprehensive searches for tour services by category (e.g. booking tours, renting vehicles, reserving tour guides, etc.) and provides easy reservation of tour services. Tour Service Providers can use TourMate to publish their services amongst other competitive providers, allowing them to be discovered by tourists and provide tour services at ease. Further they can gain reputation and publicity over time, allowing them to appear more frequently in search results.</p>
				</Jumbotron>
			</FluidContainer>
		);
	}
}