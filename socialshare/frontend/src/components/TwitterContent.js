import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Schedule from './Schedule'
import TwitterPostGrid from './TwitterPostGrid';
import * as Actions from '../actions';
import { BASE_URL } from '../constants/global';

class TwitterContent extends Component
{
  constructor(props)
  {
    super(props);
    this.state = { newTab:'', numTab: 0 }
  }

  addTab(e)
  {
    if(this.state.numTab < 6)
    {
        this.setState({newTab:'', numTab:this.state.numTab+1});
    }
    else
    {
        this.setState({newTab:'disabled'});
    }
  }

  handlepostSubmit(e)
  {
        e.preventDefault();
        const post_content = this.refs.post_content.value

  }

  componentWillMount()
  {
    this.props.gettwpostque()
    this.props.gettwslot()
    this.props.gettwuser()
  }


  handlepostSubmit(e)
  {
    e.preventDefault();
    const slot = this.props.twslots[0]
    const user = this.props.twusers[0]
    const post_content = this.refs.post_content.value
    const date = '2017-03-15'
    this.props.addtwpostque({
      social_user: user.id,
      post_content: post_content,
      post_date: date,
      post_slot: slot.id
    });

  }

  removeAccount(){
    var social_user_id = this.props.twuser.id
    this.props.deletetwusers(social_user_id)
    window.location.href = '/'
  }

  render()
  {
    const dayTab=['Weekend Day','Week Day','Week Day','Weekend Day','Weekend Day','Week Day']
    const tabs = [], tabsContent = [];
    for(let i=0; i < this.state.numTab; i+= 1)
    {
        if(this.state.numTab < 7)
        {
          let href = "#Tab"+ i;

          tabs.push(<li><a data-toggle="tab" href={href} onClick={this.changeTab}>{dayTab[i]} <span className="close"> ×</span></a></li>);
        }
    }

    const { twposts, twslots, twusers, twuser } = this.props
    const styles = {
      text : {
          padding: 60,
      }
    };

    var href = `${BASE_URL}deletetwposts/`+`${this.props.twuser.id}/`

    let twitter_posts_div = <div><p>No Posts scheduled yet</p></div>

    if(this.props.twposts.length > 0)
    {
      twitter_posts_div = <div>{twposts.map((post, i) =>
                                      <ul key={i}>
                                          <label>
                                              <p>Post Content: {post.post_content}</p>
                                              <p>Post Date: {post.post_date}</p>
                                          </label>
                                      </ul>)}
                            </div>
    }

    return (
      <div>
        <ul className="nav nav-tabs nav-justified" data-spy="affix" data-offset-top="10" style={{ marginLeft: '-30px',marginTop: '-40px' }}>
            <li className="active"><a data-toggle="tab" href="#cont">Twitter</a></li>

            <li><a data-toggle="tab" href="#schedule">Schedule</a></li>
            <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">Settings

                </a>
                <ul className="dropdown-menu">
                  <li><a href={href} >Empty Queue</a></li>
                  <li><a href="#" onClick={this.removeAccount.bind(this)}>Remove Account</a></li>

                </ul>
            </li>
        </ul>
        <div className="tab-content">
                    <div id="cont" className="tab-pane fade in active">
                        <TwitterPostGrid { ...this.props } social_user={this.props.twuser}/>
                    </div>
                    <div id="schedule" className="tab-pane fade">
                        <Schedule  tw_social_user={this.props.twuser}/>
                    </div>
                </div>
      </div>
    )
  }
}

function mapStateToProps(state)
{
  return {
    twposts: state.twposts,
    twslots: state.twslots,
    twusers: state.twusers
  };
}

export default connect(mapStateToProps,Actions)(TwitterContent);

