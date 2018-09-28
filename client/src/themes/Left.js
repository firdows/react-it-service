import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'reactstrap'
import { reload_user } from '../redux/actions/authActions';

class Left extends Component {
    render() {
        const { reload_user } = this.props;
       // console.log(this.props.data);
        if (this.props.authentication) {
            return (
                <div className="card">
                    <div className="card-header">
                        :: Profile ::
            </div>
                    <div className="card-body">
                        <p>
                            <label className="card-title">User :</label>
                            <span className="card-text"> {this.props.data.username}</span>
                        </p>
                        <p>
                            <label className="card-title">Name :</label>
                            <span className="card-text"> {this.props.data.name}</span>
                        </p>
                        <p>
                            <label className="card-title">Type :</label>
                            <span className="card-text"> {this.props.data.user_type === 1 ? 'ผู้ดูแล' : 'ทั่วไป'}</span>
                        </p>
                        {/* <Button onClick={this.handleReload} >Load {this.props.data.sub}</Button> */}
                        <Link to="/signout" className="btn btn-primary btn-block">Sign Out</Link>
                    </div>
                </div>
            )
        } else {
            return (null)
        }

    }

    handleReload = () => {
        if (this.props.data.sub) {
            this.props.dispatch(reload_user(this.props.data.sub))
        }
    }

}


//authentication เชควำเปน true หรอ false
//data ตวนจะไดขอมล PAYLOAD จำก token ครบ
//ทงหมดทงมวลเรำจดกำรมำตงแต action, reducer แลวครบ
function mapStateToProps(state) {
    return {
        authentication: state.authReducers.authenticated,
        data: state.authReducers.data,
        reload_user: state.authReducers.reload_user
    }
}
export default connect(mapStateToProps)(Left)