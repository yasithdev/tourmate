import React from 'react';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';

// RETURNS BOOTSTRAPPED HTML ELEMENTS
export const Img = 
  (props) => (<img className="img-circle" src={props.source} style={{"maxWidth": "100%"}}/>);

export const FluidContainer = 
  (props) => (<div className="container-fluid">{props.children}</div>);

export const Jumbotron = 
  (props) => (<div className="jumbotron text-center">{props.children}</div>);

export const Row = 
  (props) => (<div className="row">{props.children}</div>);

export const Col = 
  (props) => (<div className={"col-xs-" + props.width}>{props.children}</div>);

const Button = 
  (props) => (<a className={"btn " + (props.type ? ("btn-" + props.type) : "btn-default")}>{props.children}</a>);

export const Navbar = 
  (props) => (<nav className="navbar navbar-default"><div className="container-fluid">{props.children}</div></nav>);

export const CollapsingNav = 
  (props) => (<div className="navbar-collapse collapse" id={props.id}>{props.children}</div>);

export const Nav = 
  (props) => (<ul className={"nav navbar-nav " + (props.align == "right" ? "navbar-right " : "navbar-left ")}>{props.children}</ul>);

export const NavHeader = 
  (props) => (
    <div className="navbar-header">
      <button className="navbar-toggle" type="button" data-toggle="collapse" data-target={"#" + props.collapsetarget}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <NavItem to={props.to} parameters={props.parameters}>
        <a className="navbar-brand">{props.children}</a>
      </NavItem>
    </div>);

export const NavItem =
  (props) => (
    <Route path={props.to} params={props.parameters} children={({match}) => {
      return (<li role="presentation" className={match ? 'active' : ''}>
        <Link to={props.to}>{props.children}</Link>
      </li>);
    }} />
  );

export const NavButton = 
  (props) => (
    <Route path={props.to} params={props.parameters} children={({match}) => {
      return (<Link to={props.to}><Button>{props.children}</Button></Link>);
    }} />
  );

export const Form = 
  (props) => (<form onSubmit={props.onSubmit}>{props.children}</form>);

export class FormInput extends React.Component{
  render(){ 
    return (
      <div className="input-group">
        <span className="input-group-addon" style={{"fontStyle": "italic"}}/>
        <input type={this.props.type} className="form-control" placeholder={this.props.placeholder} onChange={this.props.onChange} ref="input"/>
        <p className="help-block">{this.props.tip}</p>
      </div>
    );
  }
}

export class FormRadioButtons extends React.Component{
  constructor(props){
    super(props);
    this.state = {'value' : ''};
    if(this.props.selection) this.state["value"] = this.props.selection;
  }

  handleChange(event){
    this.setState({value: event.target.value });
  }

  render(){
    return (
      <div className="radio">
        {this.props.buttons.map((option) => <label key={ option }><input type="radio" checked={ option === this.state.value } name='selection' value={ option } onChange={ this.handleChange.bind(this) }/>{ option }</label>)}
      </div>
    );
  }
}

export class FormCheckbox extends React.Component{
  render(){ 
    return (
      <div className="checkbox">
        <label><input type="checkbox" id={this.props.id} ref='checked' onChange={this.props.onChange} checked={this.props.checked} />{this.props.text}</label>
      </div>
    );
  }
}

export class FormCheckboxGroup extends React.Component{
  constructor(props){
    super(props);
    if(this.props.selection){
      this.state = this.props.selection;
    } 
    else {
      let selection = {};
      for(option of this.props.options){
        selection[option] = false;
      }
      this.state = selection;
    }
  }

  handleChange(event){
    this.state[event.target.id] = event.target.checked;
    this.setState(this.state);
  }

  render(){
    return (
      <div className="input-group" >
        {this.props.options.map((option) => <FormCheckbox id={option} checked={this.state[option]} ref={option} key={option} text={option} onChange={this.handleChange.bind(this)} />)}
      </div>
    );
  }
}

export class FormButton extends React.Component{
  render(){ 
    return (
      <button type="submit" className="btn btn-default">{this.props.text}</button>
    );
  }
}