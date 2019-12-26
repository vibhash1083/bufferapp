import React, { Component, PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import $ from 'jquery'
import idle from 'jquery.idle'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { resetErrorMessage } from '../actions'
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { logoutUser } from '../actions/auth_actions'

class AuthenticatedApp extends Component
{
  constructor(props)
  {
    super(props)
  }
/*
  componentDidMount()
  {
    this.props.getfbuser()
    this.props.gettwuser()


    $(document).idle({
      onIdle: this._onIdle.bind(this),
      idle: 5000*60
    }, this)
  }

  _onIdle()
  {
    const { isAuthenticated } = this.props
    if(isAuthenticated) {
      this.logout()
    }
  }
*/
  logout()
  {
    const { dispatch } = this.props;
    dispatch(logoutUser())
  }

  get navbar()
  {
    const { isAuthenticated, payload, token } = this.props


    if(isAuthenticated)
    {
      var right_icons = (
        <Nav pullRight style={{ marginRight: '-15px',marginTop: '20px' }}>
            <NavItem eventKey={1}>

            </NavItem>
            <NavDropdown eventKey={2} title='Help'>

                <MenuItem eventKey={2.1} href="https://twitter.com/intent/tweet?text=&via=Social Share" ><i className="fa fa-twitter"></i> Tweet to Us
                </MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title={payload.username}>

                <MenuItem eventKey={3.1} onClick={(event)=> this.logout()}> Logout
                </MenuItem>
            </NavDropdown>
        </Nav>
      );
    }
    else
    {
      var right_icons = (
        <Nav pullRight style={{ marginRight: '50px', marginTop: '20px' }}>
            <LinkContainer to="/signin/">
                <NavItem eventKey={1}>
                    Sign in
                </NavItem>
            </LinkContainer>
            <LinkContainer to="/signup/">
                <NavItem eventKey={2}>
                    Sign Up
                </NavItem>
            </LinkContainer>
        </Nav>
      );
    }

    return (
      <Navbar fluid={true} style={{ height: "90px", backgroundColor: 'aliceblue' }}>
          <Navbar.Header>
              <Navbar.Brand>
                  <Link to="/" style={{ marginLeft: '130px',marginTop: '20px' }}>
                  <strong>Social Share</strong>
                  </Link>
              </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          </Nav>
          {right_icons}
      </Navbar>
    )
  }

  render()
  {
    return (
      <div>
          {this.navbar}
          <br/>
          <Grid fluid={true}>
              {this.props.children}
          </Grid>
      </div>
    )
  }
}

AuthenticatedApp.propTypes = {
  isAuthenticated: PropTypes.bool,
  payload: PropTypes.object
}

function mapStateToProps(state, ownProps)
{
  const { auth } = state
  const { isAuthenticated, payload, token } = auth
  return {
    isAuthenticated: isAuthenticated,
    payload: payload,
    token: token,
    fbusers: state.fbusers,
    twusers: state.twusers
  }
}

export default connect(mapStateToProps)(AuthenticatedApp)