import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import { Row, Col, Form, FormInput, FormButton, FormCheckboxGroup, Button} from '../common/Components';

import {Reservations} from '../../api/reservations'

// contact us page for tourist
class PlanTour extends React.Component {
	constructor(props){
		super(props);
		this.availableServices = ['Vehicle Rent', 'Tours', 'Tour Guides'];
		this.state = {'results' : ''};
	}

	handleSearch(event){
		event.preventDefault();

		// Create query
		let query = this.generateQuery(
			this.availableServices.filter((key) => this.refs.inputServices.state[key])
		);
		
		// Update state with search results for query
		this.setState({ 'results' : this.props.searchResults(query) });
	}

	generateQuery(selectedServices){
		let query = { 'profile.role' : 'tour-provider' };
		for(service of selectedServices){
			query['profile.services.' + service] = true;
		}
		return query;
	}

	render(){
		return (
			<div>

				{/*SECTION > Search Form*/}
				<Form title="Search for a service" onSubmit={this.handleSearch.bind(this)}>
					<Col width="6">
						<FormCheckboxGroup placeholder="Services" options={this.availableServices} ref="inputServices"/>
					</Col>
					<Col width="6">
						<FormInput type="date" placeholder="Start Date" ref="inputStartDate"/>
						<FormInput type="date" placeholder="End Date" ref="inputEndDate"/>
						<FormButton text="Search"/>
					</Col>
				</Form>
				
				{/*SECTION > Search Results*/}
				<div className="well bs-component">
					<h4>Search Results</h4>
					{ 
						Object.keys(this.state.results) 
							? Object.keys(this.state.results).map((result) => <SearchResult key={result} data={this.state.results[result].profile} />)
							: '' 
					}
				</div>
			</div>
		);
	}
}

export default PlanTourContainer = createContainer((props) => {
	Meteor.subscribe('tour-providers');
	return({
		currentUser: Meteor.user(),
		searchResults: (params) => Meteor.users.find(params).fetch(),
	});
}, PlanTour);


// Components ------------------------------------------------------------------------------------------
class SearchResult extends React.Component {
	constructor(props){
		super(props);
	}

	handleClick(event){
		event.preventDefault();
	}

	render(){
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">
						{this.props.data.name}
						<Button type="primary" onClick={this.handleClick.bind(this)}>Reserve</Button>
					</h3>
				</div>
				<div className="panel-body">
					{this.props.data.bio}
				</div>
			</div>
		);
	}
}