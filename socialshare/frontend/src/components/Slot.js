import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'

import { Table } from 'react-bootstrap';
import classnames from 'classnames';

import * as Actions from '../actions';

class Slot extends Component
{

    constructor(props)
    {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount()
    {
      this.props.getfbslot()
      this.props.getfbuser()
      this.props.gettwslot()
      this.props.gettwuser()
    }

    handleDelete(e)
    {
        e.preventDefault()
        var slot_id = e.target.getAttribute('data-key')
        var social_user_id = e.target.getAttribute('data-value')


        if(this.props.tw_social_user){
          if(this.props.tw_social_user.id == social_user_id){
            this.props.deletetwslots(slot_id)
          }
        }

        if(this.props.fb_social_user){
          if(this.props.fb_social_user.id == social_user_id){
            this.props.deletefbslots(slot_id)
          }
        }
    }

    render() {
    const { slot, i, actions } = this.props;

    return (
                <div className='SlotSection'>
                <Table striped bordered condensed hover>
                    <tbody>
                        <tr>
                            <td>
                                {slot.slot_time}
                            </td>

                            <td width="30 px">
                                <a href='#' data-toggle="tooltip" data-placement="top" title="Delete">
                                <i className="fa fa-trash-o" data-key={slot.id} data-value={slot.social_user} onClick={this.handleDelete}>
                                </i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </div>
            );
    }
}

function mapStateToProps(state)
{
  return {
    fbslots: state.fbslots,
    fbusers: state.fbusers,
    twslots: state.twslots,
    twusers: state.twusers,

  };
}

export default connect(mapStateToProps,Actions)(Slot);