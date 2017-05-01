import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, IndexRoute, Route, Link, Redirect } from 'react-router-dom';

import App from '../imports/ui/common/App';
import About from '../imports/ui/common/About';
import Home from '../imports/ui/common/Home';
import Login from '../imports/ui/common/Login';
import Logout from '../imports/ui/common/Logout';
import Register from '../imports/ui/common/Register';

export class Routes extends React.Component {
	render() {
		return (
			<Router>
				<div className="container-fluid">
					<Route path="/" component={App}/>

					{/*Child Routes*/}
					<Route exact path="/" component={Home}/>
					<Route path="/about" component={About}/>
					<Route path="/login" render={()=> this.props.currentUser
						? (<Redirect to={"/" + this.props.currentUser.profile.role + "/" + this.props.currentUser.username}/>)
						: (<Login/>)} />
					<Route path="/logout" component={Logout}/>
					<Route path="/register" component={Register}/>
					<Route path="/tourist/:username" render={() => this.props.currentUser
						? <TouristApp/>
						: (<Redirect to="/login"/>) }/>
					<Route path="/tour-provider/:username" render={() => this.props.currentUser
						? <TourProviderApp/>
						: (<Redirect to="/login"/>) }/>

					{/*Route corrections*/}
					<Route path="/tourist" render={() => this.props.currentUser
						? (<Redirect to={"/tourist/" + this.props.currentUser.username} />)
						: (<Redirect to="/login"/>) }/>
					<Route path="/tour-provider" render={() => this.props.currentUser
						? (<Redirect to={"/tour-provider/" + this.props.currentUser.username} />)
						: (<Redirect to="/login"/>) }/>
				</div>
			</Router>
		);
	}
}

export default RoutesContainer = createContainer((props) => {
  return {
    currentUser: Meteor.user(),
  };
}, Routes);


Meteor.startup(() => {
	// Render application routes into content in main.html
	ReactDOM.render(<RoutesContainer/>, document.getElementById('render-target'));
});