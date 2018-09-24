import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signout } from '../../redux/actions/authActions'
class Signout extends Component{
    //เมอเรยกใชงำน Component นจะสง dispatch ไป signout ทนท
    //ทำแบบนมนงำยดครบ
    componentWillMount() {
        this.props.dispatch(signout())
    }
    render() {
        return (
            <div>Signout Complete See You Again</div>
        )
    }
}
export default connect()(Signout)