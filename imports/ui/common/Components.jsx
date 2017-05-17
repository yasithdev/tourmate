import React from 'react';
import { BrowserRouter as Router, Route, Link, browserHistory } from 'react-router-dom';
import StarRating from 'react-star-rating';

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
  function(props) {return(<a className={"btn " + (props.type ? ("btn-" + props.type) : "btn-default") + " " + props.className} style={props.style} data-toggle={props.dataToggle} data-target={props.dataTarget} id={props.id} onClick={props.onClick} disabled={props.disabled}>{props.children}</a>)};

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

// --------------------
// Composite Components
// --------------------
export class ChatBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {'text' : ''};
  }

  handleChange(event){
    this.setState({'text' : event.target.value});
  }

  handleKeyPress(event){
    if(event.key === 'Enter'){
      event.preventDefault();
      this.props.onSubmit(event);
    }
  }
  
  render() {
    return (
        <div className="well bs-component">
          <Row>
            <Col width="10"><textArea ref="inputMessage" value={this.state.text} onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)} rows="3" style={{'width' : '100%'}}/></Col>
            <Col width="2"><Button type="primary" disabled={this.state.text == ''} onClick={this.props.onSubmit}>Send</Button></Col>
          </Row>
        </div>
    );
  }
}

export class Conversation extends React.Component {
  constructor(props){
    super(props);
  }

  scrollToBottom() {
    let node = this.refs.messagesEnd;
    this.refs.chatpanel.scrollTop = this.refs.chatpanel.scrollHeight;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
  
  render() {
    return (
      <div className="well bs-component">
        <h2>{this.props.title}</h2>
        <div ref="chatpanel" className="panel-body panel-chat">
          <ul className="chat">
            {this.props.sender
              ? this.props.messages.map((msg) => (this.props.sender == msg.sender ? <SentMessage key={msg['_id']} message={msg} sender={this.props.senderName} date={msg.date}/> : <ReceivedMessage key={msg['_id']} message={msg} sender={this.props.recipientName} date={msg.date}/>))
              : ('')
            }
          </ul>
        </div>
        <p ref="messagesEnd"></p>
      </div>
    );
  }
}

export class Review extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div className="well bs-component">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <Row>
              <Col width="8"><strong className="panel-title">{this.props.review.title}</strong></Col>
              <Col className="text-right" width="4">
                <span className="text-right pull-right">
                  <StarRating name="airbnb-rating" caption="Rating : " totalStars={5} rating={this.props.review.rating} />
                </span>
              </Col>
            </Row>
          </div>
          <div className="panel-body"><p>{this.props.review.review}</p></div>
        </div>
      </div> 
    );
  }
}

export class ReservationList extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="well bs-component">
        <div className="panel-body panel-chat">
          <ul className="chat">
            {this.props.source.map((reservation) => (
              <li key={reservation['_id']} className="left clearfix">
                <Button id={reservation['_id']} name="clickbutton" onClick={this.props.onClick}>
                  <span id={reservation['_id']} className="chat-img pull-left">
                    <img id={reservation['_id']} src="http://placehold.it/50/55C1E7/fff&amp;text=YOU" alt="User Avatar" className="img-circle"/>
                  </span>
                  <div id={reservation['_id']}  className="chat-body clearfix">
                    <div id={reservation['_id']}  className="header">
                      <strong id={reservation['_id']} className="primary-font">{reservation.message}</strong>
                      <small id={reservation['_id']} className="pull-right text-muted"><span className="glyphicon glyphicon-time"></span>{reservation.status}</small>
                    </div>
                    <p id={reservation['_id']} >{'(' + reservation.startDate.toLocaleDateString() + ' - ' + reservation.endDate.toLocaleDateString() + ')'}</p>
                  </div>
                </Button>
              </li>))
            }
          </ul>
        </div>
      </div>
    );
  }
}

const ReceivedMessage = function(props) {return (
  <Row>
    <Col widthXS="9">
      <li className="left clearfix">
        <span className="chat-img pull-left">
          <img src="http://placehold.it/50/55C1E7/fff&amp;text=YOU" alt="User Avatar" className="img-circle"/>
        </span>
        <div className="chat-body clearfix">
            <div className="header">
                <strong className="primary-font">{props.sender}</strong>
                <small className="pull-right text-muted"><span className="glyphicon glyphicon-time"></span>{props.date.getHours() + ":" + props.date.getMinutes()}</small>
            </div>
            <p>{props.message.messagetext}</p>
        </div>
      </li>
    </Col>
  </Row>
);};

const SentMessage = function(props) {return (
  <Row>
    <Col widthXS="3"></Col>
    <Col widthXS="9">
      <li className="right clearfix">
        <span className="chat-img pull-right">
          <img src="http://placehold.it/50/FA6F57/fff&amp;text=ME" alt="User Avatar" className="img-circle"/>
        </span>
        <div className="chat-body clearfix">
            <div className="header">
                <small className="text-muted"><span className="glyphicon glyphicon-time"></span>{props.date.getHours() + ":" + props.date.getMinutes()}</small>
                <strong className="pull-right primary-font">{props.sender}</strong>
            </div>
            <p className="text-right">{props.message.messagetext}</p>
        </div>
      </li>
    </Col>
  </Row>
);};







