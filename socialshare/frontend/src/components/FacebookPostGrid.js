import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { PanelGroup, Panel } from 'react-bootstrap';
import * as Actions from '../actions';
import Schedule from './Schedule'
var moment = require('moment');
var DatePicker = require("react-bootstrap-date-picker");
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import FacebookSinglePost from './FacebookSinglePost'

class FacebookPostGrid extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
          newTab:'', numTab: 0,
          selectedSlot: -1,
          selectedMns: -1,
          date: new Date().toISOString(),
          dateFormat: '',
          activeKey: 0,
          value: moment(),
          name: 'name',

          postNowView: true,
          postLaterView: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onChange = this.onChange.bind(this)
  }

  handleChange(value,formattedValue) {

    this.setState({
        date: value,
        formattedValue: formattedValue
        })
  }

  componentDidMount()
  {

    this.props.getfbpostque()
    this.props.getfbslot()
    this.props.getfbuser()
  }

  onChange(value)
  {
    // let value_format = value.format('HH:mm:ss')
    this.setState({ value });
  }

  handlepostSubmit(e)
  {
        e.preventDefault();
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();
        var date = yyyy+'-'+mm+'-'+dd;

        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var slot = h+':'+m+':'+s;
        const user = this.props.fbuser
        const post_content = this.refs.post_content.value


        const slot_index = this.props.fbslots.findIndex(
            x => x.id==parseInt(this.state.selectedSlot));
        const slot_obj = this.props.fbslots[slot_index];
        if(this.state.formattedValue){
            date = this.state.formattedValue
        }

        var post_custom_time = moment().format('HH:mm:ss')

        if (slot_obj)
        {

            this.props.addfbpostque({
              social_user: user.id,
              post_content: post_content,
              post_date: date,
              post_slot: slot_obj.id,
              post_custom_time: post_custom_time
            });
            this.refs.post_content.value = ''
            this.setState({selectedSlot: -1})
        }
        else
        {
            this.props.addfbpostque({
              social_user: user.id,
              post_content: post_content,
              post_date: date,
              post_slot: slot_obj,
              post_custom_time: post_custom_time
            });
            this.refs.post_content.value = ''
            date = ''
        }

  }


  handleSelect(activeKey) {
    this.setState({ activeKey });
  }

  handleSlotSelect(event)
  {
    this.setState({
      selectedSlot: event.target.value
        });
  }

  handleDelete(e){
    e.preventDefault()
    var post_id = e.target.getAttribute('data-key')
    this.props.deletefbposts(post_id)
    this.getUpdate()
  }

  togglePostScheduleView()
  {
    this.state.postNowView ? this.setState({postNowView: false}) : this.setState({postNowView: true});
    this.state.postLaterView ? this.setState({postLaterView: false}) : this.setState({postLaterView: true});
  }

  getUpdate()
  {
    this.props.getfbpostque();
  }

  render()
  {
    const showSecond = true;
    const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

    const { fbposts, fbslots, fbusers } = this.props


    const styles = {
      text : {
          padding: 60,
      }
    };

  let facebook_posts_div = ''


  if(this.props.fbposts.length > 0)
  {

    var fbposts_user = fbposts.filter((option) => option.social_user == this.props.fbuser.id);

    facebook_posts_div = <PanelGroup activeKey={this.state.activeKey}
                            onSelect={this.handleSelect} accordion>
                            {fbposts_user.map((post, i) =>
                                <FacebookSinglePost {...this.props} key={i} i={i} post={post}/>
                            )}
                        </PanelGroup>
  }

  let facebook_slots_div = <select className="form-control" name = "posts">
                                <option value="-1">No Slot</option>
                           </select>

  if(this.props.fbslots.length > 0){
    const fbslots_filter = fbslots.filter((option) => option.social_user == this.props.fbuser.id);

    facebook_slots_div = <select className="form-control" name = "slots"
                        onChange={this.handleSlotSelect.bind(this)}>
                        <option value="-1">Select Slot</option>
                        {fbslots_filter.map((slot, i) =>
                                <option key={i} name="{slot.id}" value={slot.id}>
                                  { slot.slot_time }
                                </option>
                        )}

                        </select>
  }

  return (
            <div>
                    <ul className="nav nav-tabs nav-pills ">
                        <li className="active"><a data-toggle="tab" href="#queue">Queue</a></li>
                        {/*<li><a data-toggle="tab" href="#review">For Review</a></li>
                        <li><a data-toggle="tab" href="#inbox">Content Inbox</a></li>*/}
                    </ul>
                    <div className="tab-content">
                        <div id="queue" className="tab-pane fade in active">
                            <div className="form-group row" style={{ paddingTop: '15px' }}>

                                <form ref="FbPostForm" onSubmit={this.handlepostSubmit.bind(this)}>

                                    <div className="col-sm-4">
                                        <textarea className="form-control" rows="1" onfocus="this.rows=10" style={{reSize:'none'}} id="comment" ref='post_content' placeholder="What do you want to share" required></textarea>
                                    </div>
                                    <div className='col-sm-3'>
                                        <DatePicker onChange={this.handleChange} dateFormat="YYYY-MM-DD" value={this.state.date} placeholder="Select a date" id="change_handler_example" />
                                    </div>

                        {this.state.postLaterView &&<div className="form-group col-sm-2">
                          <div id="myDropdown" className="dropdown-content">
                              {facebook_slots_div}
                          </div>
                        </div>}

                        {this.state.postNowView &&
                        <div className="form-group col-sm-2">
                        <input type="submit" className="btn btn-primary" value="Share Now" />
                        </div>}

                        {this.state.postLaterView &&
                        <div className="form-group col-sm-2">
                        <input type="submit" className="btn btn-primary" value="Add to queue" />
                        </div>}

                        {this.state.postNowView &&
                        <div className="form-group col-sm-1">
                        <button className="btn btn-info" onClick={this.togglePostScheduleView.bind(this)}>Post Later</button>
                        </div>}

                        {this.state.postLaterView &&
                        <div className="form-group col-sm-1">
                        <button className="btn btn-info" onClick={this.togglePostScheduleView.bind(this)}>Cancel</button>
                        </div>}

                      </form>

                            </div>
                            <div className="loader">
                            {facebook_posts_div}
                            </div>
                        </div>
                        <div id="review" className="tab-pane fade">
                            <h3 style={styles.text}>Collaborate with your team on Buffer for Business</h3>
                        </div>
                        <div id="inbox" className="tab-pane fade">
                            <h3>Add multiple feeds to create a powerful content inbox</h3>
                            <h4>Save time discovering great content to share by connecting your favorite blogs and publications to Buffer.</h4>
                            <div className="col-sm-8">
                                <input className="form-control input-lg" type="text" placeholder="" />
                            </div>
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

export default connect(mapStateToProps,Actions)(FacebookPostGrid);