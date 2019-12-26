import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router';

class Registered extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
            You have registered successfully. Click <Link to={`signin/`}>here</Link> to sign in to the application.
      </div>
    );
  }
}

export default connect()(Registered)