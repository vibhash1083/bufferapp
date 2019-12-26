import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AddAccountPage from './AddAccountPage';
import FacebookContent from './FacebookContent';
import TwitterContent from './TwitterContent';
import * as Actions from '../actions';

class Main extends Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      dashboardView: true,
      facebookView: false,
      twitterView: false,
      linkedInView: false,
      fbuser: null,
      twuser: null
    };
  }

  componentDidMount()
  {
    this.props.getfbuser()
    this.props.gettwuser()
  }

  toggleDashboardView()
  {
        this.setState({ facebookView: false });
        this.setState({ dashboardView: true });
        this.setState({ twitterView: false });
        this.setState({ linkedInView: false });
  }

  toggleFacebookView(e)
  {
        var post_id = e.target.getAttribute('data-key')
        const fbuser_index = this.props.fbusers.findIndex(
            x => x.id==parseInt(post_id));
        const fbuser_obj = this.props.fbusers[fbuser_index];
        this.setState({fbuser: fbuser_obj})

        this.setState({ facebookView: true });
        this.setState({ dashboardView: false });
        this.setState({ twitterView: false });
        this.setState({ linkedInView: false });
  }

  toggleTwitterView(e)
  {
        var post_id = e.target.getAttribute('data-key')
        const twuser_index = this.props.twusers.findIndex(
            x => x.id==parseInt(post_id));
        const twuser_obj = this.props.twusers[twuser_index];
        this.setState({twuser: twuser_obj})

        this.setState({ facebookView: false });
        this.setState({ dashboardView: false });
        this.setState({ twitterView: true });
        this.setState({ linkedInView: false });
  }

  toggleLinkedInView()
  {
        this.setState({ facebookView: false });
        this.setState({ dashboardView: false });
        this.setState({ twitterView: false });
        this.setState({ linkedInView: true });
  }

  render()
  {

    const { fbusers, payload, twusers, token } = this.props

    var facebook_users_div = <li>
                                <a className="list-group-item" href="#facebook/" onClick={this.toggleDashboardView.bind(this)}>
                                    Facebook
                                </a>
                              </li>
    var twitter_user_div = <li>
                                <a className="list-group-item" href="#twitter/" onClick={this.toggleDashboardView.bind(this)}>
                                    Twitter
                                </a>
                            </li>

    var fbuser_filter = fbusers.filter((option) => option.user == this.props.payload.user_id);
    var twuser_filter = twusers.filter((option) => option.user == this.props.payload.user_id);

    if(twuser_filter){

      twitter_user_div = <div>{twuser_filter.map((user, i) =>
                            <li key={i}><a className="list-group-item" href='#twitter/' data-key={user.id} onClick={this.toggleTwitterView.bind(this)}><img src={user.profile_image_url} className="img-circle"/><i className="fa fa-twitter fa-lg" style={{ position: 'relative', left: '-10px', top: '20px',color: '#1E90FF' }}></i> {user.name}</a>
                            </li>
                            )}
                         </div>

    }

    if(fbuser_filter){

      facebook_users_div = <div>{fbuser_filter.map((user, i) =>
                            <li key={i}><a className="list-group-item" href='#facebook/' data-key={user.id} onClick={this.toggleFacebookView.bind(this)}><img src={user.picture_url} className="img-circle"/><i className="fa fa-facebook-square fa-lg" style={{ position: 'relative',
                                left: '-10px', top: '20px',color: 'navy' }}></i> {user.name}</a>
                            </li>
                            )}
                           </div>

    }


    let users_list = <ul className="nav nav-pills nav-stacked list-group"
                        style={{ marginLeft:'-20px', height:'1000px', backgroundColor: 'lavender'}}>
                      <li><a style={{height: '70px', paddingTop:'25px'}} className="list-group-item" href="#" onClick={this.toggleDashboardView.bind(this)}>Accounts</a>
                      </li>
                        {facebook_users_div}
                        {twitter_user_div}

                     </ul>

    return (
      <div>
        <div className="row">
            <div className="col-md-3">
                <div className="navbar-default sidebar" style={{ marginTop: '-40px' }} role="navigation">
                  <div className="sidebar-nav ">
                    {users_list}
                  </div>
                </div>
            </div>
            {this.state.dashboardView &&
                <div className="col-md-9">
                    <AddAccountPage />
                </div>}
            {this.state.facebookView &&
                <div className="col-md-9">
                    <FacebookContent { ...this.props } fbuser={this.state.fbuser}/>
                </div>}
            {this.state.twitterView &&
                <div className="col-md-9">
                    <TwitterContent { ...this.props } twuser={this.state.twuser}/>
                </div>}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state)
{
  const { auth } = state
  const { isAuthenticated, payload,token } = auth
  return {
    fbusers: state.fbusers,
    twusers: state.twusers,
    isAuthenticated: isAuthenticated,
    payload: payload,
    token: token
     };

}

export default connect(mapStateToProps, Actions)(Main);