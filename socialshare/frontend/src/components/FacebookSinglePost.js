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
var Modal = require('react-modal');

class FacebookSinglePost extends Component
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
        dateFormat: '',
        activeKey: 0,
        value: moment(),
        name: 'name',
        button: 'Share Now',
        showModal: false,
        modalIsOpen: false

    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
     this.onChange = this.onChange.bind(this)

  }

  onChange(value)
  {
    // let value_format = value.format('HH:mm:ss')
    this.setState({ value });

  }

  openModal()
  {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.refs.subtitle.style.color = '#f00';
  }

  closeModal()
  {
    this.setState({modalIsOpen: false});
  }

  submitEditHandler(e)
  {
    e.preventDefault();

    var post = this.refs.post_content.value

    var post_content_id = this.props.post.id

    this.setState({modalIsOpen: false});
    //this.props.deletefbposts(post_content_id)

    this.props.editfbpostque({
        post_content: post,
        social_user: this.props.post.social_user,
        post_date: this.props.post.post_date,
        post_slot: this.props.post.post_slot,
        post_custom_time: this.props.post.post_custom_time,
        id: this.props.post.id
        });
  }

  handleChange(value,formattedValue) {

    this.setState({
        date: value,
        formattedValue: formattedValue
        })

  }

  handleDelete(e)
  {
    e.preventDefault()
    var post_id = e.target.getAttribute('data-key')
    this.props.deletefbposts(post_id)
  }

  render()
  {
    const showSecond = true;
    const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '20%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    const { post, i, fbslots } = this.props;

    var slot = post.post_custom_time
    if (post.post_slot){
        var slot_index = this.props.fbslots.findIndex(
            x => x.id==parseInt(this.props.post.post_slot));
        slot = this.props.fbslots[slot_index].slot_time;
    }


    return (
        <div>
            <Panel header={post.post_content} eventKey={i}>
                <b>Date: </b>  {post.post_date}  <i className="fa fa-clock-o" style={{ paddingLeft: '15px' }}>  {slot}</i>
                <a href="#" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-pencil" aria-hidden="true" data-key={post.id} onClick={this.openModal} style={{float: 'right',paddingLeft: '15px'}}></i></a>
                <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal">

                    <div className="form-group row" style={{ paddingTop: '15px' }}>

                        <form ref="PostForm" onSubmit={this.submitEditHandler.bind(this)}>

                            <div className="col-sm-4">
                                <textarea className="form-control" rows="1" onfocus="this.rows=10" style={{reSize: 'none'}} id="comment" ref='post_content' placeholder={post.post_content} required></textarea>
                            </div>



                            <input type="submit" className="btn btn-primary col-sm-2" value="Update" />

                        </form>

                    </div>
                    <button onClick={this.closeModal}>close</button>

                </Modal>
                <a href='#' data-toggle="tooltip" data-placement="top" title="Delete">  <i className="fa fa-trash-o"  data-key={post.id} onClick={this.handleDelete} style={{float: 'right'}}></i></a>
            </Panel>
        </div>
    );
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

export default connect(mapStateToProps,Actions)(FacebookSinglePost);