import React from 'react';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';

// RETURNS BOOTSTRAPPED HTML ELEMENTS
export const Img =
  function(props) {return(<img className="img-circle" src={props.source} style={{"maxWidth": "100%"}}/>)};

export const FluidContainer =
  function(props) {return(<div className="container-fluid">{props.children}</div>)};

export const Jumbotron =
  function(props) {return(<div className="jumbotron text-center">{props.children}</div>)};

export const Row =
  function(props) {return(<div className="row">{props.children}</div>)};

export const Col =
  function(props) {return(<div className={
    (props.widthXS ? ("col-xs-" + props.widthXS) : " ") +
    (props.width ? ("col-sm-" + props.width) : " ") +
    (props.widthM ? ("col-md-" + props.widthM) : " ") +
    (props.widthL ? ("col-lg-" + props.widthL) : " ") +
    " " + props.className}>{props.children} </div>)};

export const Button =
  function(props) {return(<a className={"btn " + (props.type ? ("btn-" + props.type) : "btn-default") + " " + props.className} data-toggle={props.dataToggle} data-target={props.dataTarget} id={props.id} onClick={props.onClick}>{props.children}</a>)};

export const Navbar =
  function(props) {return(<nav className="navbar navbar-default"><div className="container-fluid">{props.children}</div></nav>)};

export const CollapsingNav =
  function(props) {return(<div className="navbar-collapse collapse" id={props.id}>{props.children}</div>)};

export const Nav =
  function(props) {return(<ul className={"nav navbar-nav " + (props.align == "right" ? "navbar-right " : "navbar-left ")}>{props.children}</ul>)};

export const NavHeader =
  function(props) {return(
    <div className="navbar-header">
      <button className="navbar-toggle" data-toggle="collapse" data-target={"#" + props.collapsetarget}>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <NavItem to={props.to} parameters={props.parameters} collapsetarget={props.collapsetarget}>
        <a className="navbar-brand">{props.children}</a>
      </NavItem>
    </div>)};

export const NavItem =
  function(props) {return(
    <Route path={props.to} params={props.parameters} children={({match}) => {
      return (<li role="presentation" className={match ? 'active' : ''} data-toggle="collapse" data-target={"#" + props.collapsetarget + ".in"}>
        <Link to={props.to}>{props.children}</Link>
      </li>);
    }} />
  )};

export const NavButton =
  function(props) {return(
    <Route path={props.to} params={props.parameters} children={({match}) => {
      return (<Link to={props.to}><Button>{props.children}</Button></Link>);
    }} />
  )};

export const Form =
  function(props) {return(
    <div className="well bs-component">
      <form className="form-horizontal" onSubmit={props.onSubmit}>
        <fieldset>
          <legend>{props.title}</legend>
          {props.children}
        </fieldset>
      </form>
    </div>)};

export class FormInput extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="form-group">
        <label htmlFor={this.props.placeholder} className="col-lg-2 control-label">{this.props.placeholder}</label>
        <div className="col-lg-10">
          <input type={this.props.type} className="form-control" placeholder={this.props.placeholder} onChange={this.props.onChange} ref="input" minLength={this.props.minlength ? this.props.minlength : 0}/>
          <p className="help-block">{this.props.tip}</p>
        </div>
      </div>
    );
  }
}

export class FormTextArea extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="form-group">
        <label htmlFor={this.props.placeholder} className="col-lg-2 control-label">{this.props.placeholder}</label>
        <div className="col-lg-10">
          <textarea className="form-control" rows={this.props.rows} placeholder={this.props.placeholder} onChange={this.props.onChange} ref="input" minLength={this.props.minlength ? this.props.minlength : 0}/>
        </div>
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
      <div className="form-group">
        <label className="col-lg-2 control-label">{this.props.placeholder}</label>
        <div className="col-lg-10">
            {Object.keys(this.props.buttons).map((key) =>
              (<div className="radio" key={ key }>
                <label>
                  <input type="radio" checked={ key === this.state.value } name='selection' value={ key } onChange={ this.handleChange.bind(this) }/>
                  { this.props.buttons[key] }
                </label>
              </div>)
            )}
        </div>
      </div>
    );
  }
}

export class FormCheckbox extends React.Component{
  render(){
    return (
      <div className="form-group">
        <label className="col-lg-2 control-label">{this.props.placeholder}</label>
        <div className="col-lg-10">
          <label><input type="checkbox" id={this.props.id} ref='checked' onChange={this.props.onChange} checked={this.props.checked} />{this.props.text}</label>
        </div>
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
      <div className="form-group" >
        <label className="col-lg-2 control-label">{this.props.placeholder}</label>
        <div className="col-lg-10">
          {this.props.options.map((option) => <div key={option}><label><input type="checkbox" id={option} checked={this.state[option]} ref={option} onChange={this.handleChange.bind(this)} /> {option}</label></div>)}
        </div>
      </div>
    );
  }
}

export class FormButton extends React.Component{
  render(){
    return (
      <div className="form-group">
        <div className="col-lg-10 col-lg-offset-2">
          <button type="submit" className="btn btn-primary" disabled={this.props.enabled === false}>{this.props.text}</button>
        </div>
    </div>
    );
  }
}

export class Modal extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div id={this.props.id} className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <a className="close" data-dismiss="modal" aria-hidden="true">&times;</a>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <a className="btn btn-default" data-dismiss="modal">{this.props.cancelText}</a>
              <a className="btn btn-primary" data-dismiss="modal" onClick={this.props.onClick}>{this.props.submitText}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

