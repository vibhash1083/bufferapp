import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions';
import { BASE_URL } from '../constants/global'

class AddAccountPage extends Component
{
  constructor (props, context)
  {
      super(props, context);
  }

  render()
  {
    const { payload } = this.props
    let userid = payload.user_id
    let twitter_url = BASE_URL +'user/' + userid + "/twitterlogin"
    let facebook_url = BASE_URL +'user/' + userid + "/facebooklogin"

    return (
      <div style={{ marginTop: '-40px' }}>
          <h3>Connect a Social Network</h3>

          <p>Click the 'Connect' buttons below to add your account to our application.
          </p>

          <div className="col-sm-1" style={{ color: '#33b5e5',textAlign: 'center' }}>
              <p><i className="fa fa-twitter fa-5x" aria-hidden="true"></i></p>
              <p>twitter</p>

              <a href={twitter_url}>
                  <button type="button" style={{width: '80px'}} className="btn btn-info">Connect</button>
              </a>
          </div>

          <div className="col-sm-2" style={{ color: '#3F729B',textAlign: 'center' }}>
              <p><i className="fa fa-facebook-official fa-5x" aria-hidden="true"></i></p>
              <p>facebook</p>
              <a href={facebook_url}>
                  <button type='button' className='btn btn-primary' style={{width: '70px', margin: '1px'}}>Login</button>
              </a>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state)
{
  const { auth } = state
  const { isAuthenticated, payload } = auth

  return {
    isAuthenticated: isAuthenticated,
    payload: payload
  };
}

export default connect(mapStateToProps, Actions)(AddAccountPage);