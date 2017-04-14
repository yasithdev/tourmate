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

export const Nav = 
  (props) => (<ul className="nav nav-tabs">{props.children}</ul>);

export const NavItem =
  (props) => (
    <Route path={props.to} params={props.parameters} children={({match}) => (
      <li role="presentation" className={match ? 'active' : ''}>
        <Link to={props.to}>{props.children}</Link>
      </li>
    )} />
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
        <input type={this.props.type} className="form-control" placeholder={this.props.placeholder} onChanged={this.props.onChanged} ref="input"/>
        <p className="help-block" ref='helptext'></p>
      </div>
    );
  }
}

export class FormRadioButtons extends React.Component{
  render(){ 
    return (
      <div className="radio">
        {this.props.buttons.map((button) => <label className='radio'><input type="radio" ref="selection" name='selection' value={button}/>{button}</label>)}
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