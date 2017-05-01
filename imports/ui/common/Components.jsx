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

export const Button = 
  (props) => (<button type="button" className="btn">{props.children}</button>);

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
      return (<li role="presentation" className={match ? match.isExact ? 'active' : '' : ''}>
        <Link to={props.to}>{props.children}</Link>
      </li>);
    }} />
  );

export const NavButton = 
  (props) => (
    <Route path={props.to} params={props.parameters} children={({match}) => (
      <Button>
        <Link to={props.to}>{props.children}</Link>
      </Button>
    )} />
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
        <label><input type="checkbox" ref='checked'/>{this.props.text}</label>
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