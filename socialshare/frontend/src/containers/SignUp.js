import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Panel, FormGroup, ControlLabel, FormControl,
Button, Alert } from 'react-bootstrap'
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/signup_actions'
import { update_signup_form, signupUser } from '../actions/signup_actions'

class SignUp extends Component {

  constructor(props) {
    super(props)
  }


  handleForm(event) {

    event.preventDefault();
    const { dispatch } = this.props
    dispatch(signupUser({
      username: this.props.username,
      password: this.props.password,
      email: this.props.email
    }));
  }

  updateSignupForm(event, key) {
    const { dispatch } = this.props
    dispatch(update_signup_form(event.target.value, key))
  }

  render() {

    // Panel title
    const title = (<h4>Sign Up</h4>);

    // Show errors if availables.
    var error = undefined
    if(this.props.error != null ) {
      error = (
    <Alert bsStyle="danger" >
      {this.props.error.username[0]}
    </Alert>
      );
    }


    return (
      <div>
    <Row>
      <Col md={4} mdOffset={4}>
        {error}
        <Panel header={title} >
          <form onSubmit={(event) => this.handleForm(event)}>
        <FormGroup >
          <ControlLabel>User name</ControlLabel>
          <FormControl
              onChange={(event) => this.updateSignupForm(event, 'username')}

              value={this.props.username}
              type="text" />
          <br/>
          <ControlLabel>E-mail</ControlLabel>
          <FormControl
              onChange={(event) => this.updateSignupForm(event, 'email')}

              value={this.props.email}
              type="email" />
          <br/>

          <ControlLabel>Password</ControlLabel>
           <FormControl
              onChange={(event) => this.updateSignupForm(event, 'password')}

              value={this.props.password}
              type="password" />
        </FormGroup>
        <Button bsStyle="primary"
            type="submit"
            onClick={(event) => this.handleForm(event)}
        >Submit</Button>
          </form>
        </Panel>
      </Col>
    </Row>
      </div>
    )
  }
}

SignUp.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  email: PropTypes.string,
  error: PropTypes.object
}

function mapStateProps(state, ownProps) {
  const { signup } = state
  const { signup_form, error } = signup
  return {
    username: signup_form.username,
    password: signup_form.password,
    email: signup_form.email,
    error: error
  }
}

export default connect(mapStateProps)(SignUp)
