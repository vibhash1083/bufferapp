import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel, Glyphicon, Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

import * as Actions from '../actions';

import Slot from './Slot'

class Schedule extends Component
{
  constructor(props)
  {
        super(props);
        this.state = {
            newTab:'',
            numTab: 0,
            selectedHrs: -1,
            selectedMns: -1,
            value: moment(),
            addSlotView: false
        }
        this.onChange = this.onChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e)
  {
        e.preventDefault()
        var slot_id = e.target.getAttribute('data-key')
        this.props.deletefbslots(slot_id)
  }

  componentDidMount()
  {
        this.props.getfbslot()
        this.props.getfbuser()
        this.props.gettwslot()
        this.props.gettwuser()
  }



  onChange(value)
  {
        // let value_format = value.format('HH:mm:ss')
        this.setState({ value });

  }

  submit()
  {
        const slot = this.state.value.format('HH:mm:ss')

        if(this.props.fb_social_user){
           const user = this.props.fb_social_user
           this.props.addfbslot({
           social_user: user.id,
           slot_time: slot
           });
        }

        if(this.props.tw_social_user){
           const user = this.props.tw_social_user
           this.props.addtwslot({
           social_user: user.id,
           slot_time: slot
           });
        }
        this.state.addSlotView ? this.setState({addSlotView: false}) : this.setState({addSlotView: true});
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

  toggleAddSlotView()
  {
        this.state.addSlotView ? this.setState({addSlotView: false}) : this.setState({addSlotView: true});
  }

  render()
  {
        const { fbslots, twslots } = this.props;
        const showSecond = true;
        const str = showSecond ? 'HH:mm:ss' : 'HH:mm';


        const dayTab=['Weekend Day','Week Day','Week Day','Weekend Day','Weekend Day','Week Day'];
        const tabs = [], tabsContent = [];
        for(let i=0; i < this.state.numTab; i+= 1)
        {
            if(this.state.numTab < 7)
            {
              let href = "#Tab"+ i;

              tabs.push(<li><a data-toggle="tab" href={href} onClick={this.changeTab}>{dayTab[i]} <span className="close"> ×</span></a></li>);
            }
        }

        let facebook_slots_div = <div>No Slots saved</div>

        let slot_div = <div>No Slots saved</div>

        let add_slot_div = <div>
                            <TimePicker style={{ width: 80 }} showSecond={showSecond} defaultValue={this.state.value} className="input" onChange={this.onChange} />
                            <br/>
                            <br/>
                            <button className='btn btn-primary' onClick={this.submit.bind(this)}>Add Slot</button>
                           </div>
        if(this.props.fb_social_user){

          if(this.props.fbslots.length > 0 )
          {
              const fbslots_filter = fbslots.filter((option) => option.social_user == this.props.fb_social_user.id);
              slot_div = <div>{fbslots_filter.map((slot, i) => <Slot { ...this.props } key={i} i={i} slot={slot}/>)}</div>
          }

        }

        if(this.props.tw_social_user){

          if(this.props.twslots.length > 0 )
          {
              const twslots_filter = twslots.filter((option) => option.social_user == this.props.tw_social_user.id);

              slot_div = <div>{twslots_filter.map((slot, i) => <Slot { ...this.props } key={i} i={i} slot={slot}/>)}</div>
          }

        }

        const styles = {
          text : {
              padding: 60,
          }
        };

        const title = (
          <div>Post Slots <a href='#' data-toggle="tooltip" data-placement="top" title="Add"><Glyphicon glyph="glyphicon glyphicon-plus" style={{ float: 'right' }} onClick={this.toggleAddSlotView.bind(this)}/></a></div>
        );
        return (
            <div class="page-content">
              <div className='col-sm-4'><br/>
                <Panel header={title} bsStyle="primary" >
                  {slot_div}
                </Panel>
              </div>
              {this.state.addSlotView &&
                <div className='col-sm-4'><br/>
                  <Panel header="Add a slot" bsStyle="primary" >
                    {add_slot_div}
                  </Panel>
                </div>}
            </div>
          )
  }
}

function mapStateToProps(state)
{
  return {
    fbslots: state.fbslots,
    fbusers: state.fbusers,
    twslots: state.twslots,
    twusers: state.twusers

  };
}

export default connect(mapStateToProps,Actions)(Schedule);