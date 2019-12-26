import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import * as Actions from '../actions';
import Schedule from './Schedule'
import FacebookPostGrid from './FacebookPostGrid'
import { BASE_URL } from '../constants/global';

var moment = require('moment');
var DatePicker = require("react-bootstrap-date-picker");

class FacebookContent extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      newTab:'',
      numTab: 0,
      selectedSlot: -1,
      selectedMns: -1,
      date: new Date().toISOString(),
      dateFormat: ''
    }
  }

  removeAccount()
  {
    var social_user_id = this.props.fbuser.id
    this.props.deletefbusers(social_user_id)
    window.location.href = '/'

  }

  render()
  {
    const { fbposts, fbslots, fbusers,fbuser } = this.props

    const styles = {
      text : {
          padding: 60,
        }
      };

    var href = `${BASE_URL}deletefbposts/`+`${this.props.fbuser.id}/`

    return (
      <div>
          <ul className="nav nav-tabs nav-justified" data-spy="affix" data-offset-top="10" style={{ marginLeft: '-30px',marginTop: '-40px' }}>
              <li className="active"><a data-toggle="tab" href="#cont">Facebook</a></li>

              <li><a data-toggle="tab" href="#schedule">Schedule</a></li>
              <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown">Settings

                      </a>
                  <ul className="dropdown-menu">

                      <li><a href={href}>Empty Queue</a></li>
                      <li><a href="#" onClick={this.removeAccount.bind(this)}>Remove Account</a></li>

                  </ul>
              </li>
          </ul>
          <div className="tab-content">
              <div id="cont" className="tab-pane fade in active">
                  <FacebookPostGrid { ...this.props } social_user={this.props.fbuser}/>
              </div>
              <div id="schedule" className="tab-pane fade">
                  <Schedule  fb_social_user={this.props.fbuser}/>
              </div>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state)
{
  return {
    fbposts: state.fbposts,
    fbslots: state.fbslots,
    fbusers: state.fbusers
  };
}

export default connect(mapStateToProps,Actions)(FacebookContent);