import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Left extends Component {
    render() {

        if (this.props.authentication) {
            return (
                <div className="card">
                    <div className="card-header">
                        :: Profile ::
            </div>
                    <div className="card-body">
                        <p>
                            <label className="card-title">User :</label>
                            <span className="card-text"> {this.props.data.name}</span>
                        </p>
                        <p>
                            <label className="card-title">Type :</label>
                            <span className="card-text"> {this.props.data.user_type === 1 ? 'ผู้ดูแล' : 'ทั่วไป'}</span>
                        </p>
                        <Link to="/signout" className="btn btn-primary btn-block">Sign Out</Link>
                    </div>
                </div>
            )
        } else {
            return (null)
        }

    }
}


//authentication เชควำเปน true หรอ false
//data ตวนจะไดขอมล PAYLOAD จำก token ครบ
//ทงหมดทงมวลเรำจดกำรมำตงแต action, reducer แลวครบ
function mapStateToProps(state) {
    return {
        authentication: state.authReducers.authenticated,
        data: state.authReducers.data
    }
}
export default connect(mapStateToProps)(Left)