import axios from 'axios'
import config from '../../configure'
import {browserHistory} from 'react-router'
import jwtDecode from 'jwt-decode';
//get คำ url จำกไฟล config
const BASE_URL = config.BASE_URL
//ตรวจสอบกำร Signin โดยรบ username, password
export const signin = ({username, password}) => {
    return (dispatch) => {
        //axios เอำมำใชแทน fetch รปแบบตำมกำรใชงำนตำมโคดดำนลำง
        return axios({
            method: "post",
            url: `${BASE_URL}/signin`,
            data: {
                username,
                password
            }
        }).then(response => {

            localStorage.setItem('token', response.data.token)

            browserHistory.push('/')

            const token = localStorage.getItem('token')
            dispatch({type: 'AUTH_USER', payload: jwtDecode(token)})
        }).catch(() => {
            //กรณม error
            dispatch({type: 'AUTH_ERROR', payload: "Bad Signin Info"})
        })
    }
}
// สำหรบ Signout ออกจำกระบบ และตองเอำ key ชอ token ทเกบไวใน localstorage ของ
// browser ออกดวย
export const signout = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({type: 'UNAUTH_USER'})
        browserHistory.push('/')
    }
}