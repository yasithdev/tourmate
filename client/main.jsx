import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, IndexRoute, Route, Link, Redirect } from 'react-router-dom';

import App from '../imports/ui/common/App';
import About from '../imports/ui/common/About';
import Home from '../imports/ui/common/Home';
import Login from '../imports/ui/common/Login';
import Register from '../imports/ui/common/Register';

export class Routes extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		if(this.props.isLoading){
			return (<div className="loading">Loading&#8230;</div>);
		} else {
			let currentUser = this.props.currentUser;
			return (
				<Router>
					<div className="container-fluid full">
						<Route path="/" component={App}/>

						{/*Child Routes*/}
						<Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
						<Route path="/login" render={()=> currentUser
							? (<Redirect to={"/" + currentUser.profile.role + "/" + currentUser.username}/>)
							: (<Login/>)} />
						<Route path="/logout" render={() => {
							Meteor.logout();
							return (<Redirect to="/login"/>);
						}}/>
						<Route path="/register" component={Register}/>
						<Route path="/tourist/:username" render={() => currentUser
							? <TouristApp/>
							: (<Redirect to="/login"/>) }/>
						<Route path="/tour-provider/:username" render={() => currentUser
							? <TourProviderApp/>
							: (<Redirect to="/login"/>) }/>
						{/*Route corrections*/}
						<Route path="/tourist" render={() => currentUser
							? (<Redirect to={"/tourist/" + currentUser.username} />)
							: (<Redirect to="/login"/>) }/>
						<Route path="/tour-provider" render={() => currentUser
							? (<Redirect to={"/tour-provider/" + currentUser.username} />)
							: (<Redirect to="/login"/>) }/>
					</div>
				</Router>
			);
		}
	}
}

export default RoutesContainer = createContainer((props) => {
	
	return {
    currentUser: Meteor.user(),
    isLoading : ( Meteor.loggingIn() || Meteor.user() === undefined),
  };

}, Routes);


Meteor.startup(() => {
	// Render application routes into content in main.html
	ReactDOM.render(<RoutesContainer/>, document.getElementById('render-target'));
});