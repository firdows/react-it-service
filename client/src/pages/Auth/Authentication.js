import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
//รปแบบกำร export ทำตำมนเลยครบ
export default function (ComposedComponent) {
    class Authentication extends Component {
        static contextTypes = {
            router: PropTypes.object
        }

        // เรมแรกเลยตองเชค props ทเรำ map ไวกบ authReducers
        // src/redux/reducers/authReducers.js วำ authenticated เปน true หรอเปลำ ถำไมใชก
        // redirect ไปหนำแรก
        componentWillMount() {
            if (!this.props.authenticated) {
                this
                    .context
                    .router
                    .push('signin');
            }
        }
        //เชค props authenticated ไวทนดวยนะครบ
        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this
                    .context
                    .router
                    .push('signin');
            }
        }
        render() {
            // รปแบบกำรทำเปน HOC เรำจะตองเอำ สง ComposedComponent กลบไป พรอม props เดมของ
            // component นนๆ ดวย
            return <ComposedComponent {...this.props}/>
        }
    }
    //map เขำกบ authReducers
    function mapStateToProps(state) {
        return {authenticated: state.authReducers.authenticated};
    }
    return connect(mapStateToProps)(Authentication);
}