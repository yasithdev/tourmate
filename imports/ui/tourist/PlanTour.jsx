import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import { Row, Col, Form, FormInput, FormButton, FormCheckboxGroup, Button, Modal} from '../common/Components';

import {Reservations} from '../../api/reservations'

/* ------------------------------------------------------------ *
 * Plan a Tour Page for tourist ------------------------------- *
 * ------------------------------------------------------------ */
class PlanTour extends React.Component {
	constructor(props){
		super(props);
		this.availableServices = ['Vehicle Rent', 'Tours', 'Tour Guides'];
		this.selectedId = "";
		this.state = {'results' : ''};
	}

	handleSearch(event){
		event.preventDefault();

		// Create query
		let startDate = this.refs.inputStartDate.refs.input.value;
		let endDate = this.refs.inputEndDate.refs.input.value;

		let query = this.generateQuery(
			this.availableServices.filter((key) => this.refs.inputServices.state[key]),
			startDate,
			endDate
		);
		
		// Update state with search results for query
		this.setState({ 'results' : this.props.searchResults(query) });
	}

	generateQuery(selectedServices, startDate, endDate){
		let query = { 'profile.role' : 'tour-provider' };
		for(service of selectedServices){
			query['profile.services.' + service] = true;
		}
		return query;
	}

	handleSelect(event){
		event.preventDefault();
		this.selectedId = event.target.id;
	}

	handleReserve(event){
		event.preventDefault();
		// Create reservation object
		let reservation = {
			'tourist' : this.props.currentUser._id,
			'tour-provider' : this.selectedId,
			'services' : this.availableServices.filter((key) => this.refs.inputServices.state[key]),
			'startDate' : new Date(this.refs.inputStartDate.refs.input.value),
			'endDate' : new Date(this.refs.inputEndDate.refs.input.value),
			'status' : 'pending',
			'message' : this.refs.inputMessage.value
		};
		
		// Add reservation to reservations collection
		Meteor.call('reservations.insert', reservation, (error, result) => {
			console.log(error, result);
		})
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
							? Object.keys(this.state.results).map((result) => <SearchResult onClick={this.handleSelect.bind(this)} key={result} data={this.state.results[result]} />)
							: '' 
					}
				</div>

				{/*SECTION > Modal Popup for entering Message*/}
				<Modal id="messageModal" title="Enter your reservation Message" cancelText="Close" submitText="Make Reservation" onClick={this.handleReserve.bind(this)}>
					<textArea ref="inputMessage" rows="3" style={{'width' : '100%'}}/>
				</Modal>

			</div>
		);
	}

	componentDidMount(){
		this.refs.inputStartDate.refs.input.value = new Date().toLocaleDateString();
		this.refs.inputEndDate.refs.input.value = new Date(new Date().getTime() + 86400000).toLocaleDateString();
	}
}

/* ------------------------------------------------------------ *
 * Reactive data container for PlanTour ----------------------- *
 * ------------------------------------------------------------ */
export default PlanTourContainer = createContainer((props) => {
	Meteor.subscribe('tour-providers');
	Meteor.subscribe('reservations');
	return({
		currentUser: Meteor.user(),
		searchResults: (params) => Meteor.users.find(params).fetch(),
	});
}, PlanTour);

/* ------------------------------------------------------------ *
 * Component to display each search results ------------------- *
 * ------------------------------------------------------------ */
class SearchResult extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
				<div className="panel panel-primary">
					<div className="panel-heading">
						<Row>
							<Col width="8"><h3 className="panel-title">{this.props.data.profile.name}</h3></Col>
							<Col className="text-right" width="4"><Button id={this.props.data._id} dataToggle="modal" dataTarget="#messageModal" onClick={this.props.onClick}>Select</Button></Col>
						</Row>
					</div>
					<div className="panel-body">
						{this.props.data.profile.bio}
						<ul>
							{
								this.props.data.profile.services 
									? ((Object.values(this.props.data.profile.services).indexOf(true) >= 0)
										? (Object.keys(this.props.data.profile.services).map((key) => this.props.data.profile.services[key] ? (<li key={key}>{key}</li>) : ''))
										: '(N/A)')
									: '(N/A)'
							}
						</ul>
					</div>
				</div>
		);
	}
}