import axios from 'axios'
import config from '../../configure'
//ดงเอำ url ทใช fetch data มำเกบไวใน BASE_URL
const BASE_URL = config.BASE_URL
//ฟงกชนดงขอมลผใชทกรำยกำรโดยจะสง query ชอ term เขำไปดวยเพอนำไป filter
//สำหรบ es6 เรำสำมำรถกำหนดคำ default ของ parameter ไดดวยครบ
export const loadUsers = (term = '') => {
    return (dispatch) => {
        //กอนดงขอมลสง dispatch ให reducer รวำกอนเพอจะแสดง loading
        dispatch({ type: 'LOAD_USERS_PENDING' })
        return axios.get(`${BASE_URL}/users?term=${term}`, {
            //ตองสง heder ชอ authorization โดยสง token เขำไป
            //เพอบอกให server รวำเรำได signin ถกตองแลว
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมอขอมลสงกลบมำกสง dispatch ให reducer รพรอมสง payload
            //เนองจำกเรำใช axios แทน fetch ดงนนขอมลทสงมำจะอยใน object ชอ data
            //ทม Array อยขำงใน ดงนนนำไป data.map ไดเลยครบ
            dispatch({ type: 'LOAD_USERS_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณ error
            dispatch({ type: 'LOAD_USERS_REJECTED', payload: err.message })
        })
    }
}
//ฟงกชนดงขอมลผใชตำม id ทสง
export const getUser = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_USER_PENDING' })
        return axios.get(`${BASE_URL}/users/${id}`, {
            //ตองสง heder ชอ authorization โดยสง token เขำไป
            //เพอบอกให server รว            ำเรำได signin ถกตองแลว
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมอขอมลสงกลบมำกสง dispatch ให reducer รพรอมสง payload
            //axios จะสงขอมลกลบมำกบ object ชอ data
            dispatch({ type: 'LOAD_USER_SUCCESS', payload: results.data })
        }).catch(err => {
            //กรณ error
            dispatch({ type: 'LOAD_USER_REJECTED', payload: err.message })
        })
    }
}


//ฟงกชนบนทกขอมลผใช โดยเรำจะเชควำเปนกำรเพมขอมลใหม หรอปรบปรงขอมล
export const saveUser = (values) => {
    //ถำม values.id แสดงวำเปนกำรบนทกกำรปรบปรงขอมลจงตองสง method put
    //put จะไป match กบ route ฝง server คอ app.put('/users/:id', requireAuth, users.update)
    //แตถำไมใชใหสง method post เพอเพมขอมลใหม
    //post จะไป match กบ route ฝง server คอ app.post('/users', requireAuth, users.create)
    let _id = ''
    let _method = 'post'
    if (values.id) {
        _id = values.id
        _method = 'put'
    }
    return (dispatch) => {
        //รปแบบกำรใช axios อกรปแบบในกำรจะบ method ทตองกำร
        //ตองสง heder ชอ authorization โดยสง token เขำไปดวยครบ
        return axios({
            method: _method,
            url: `${BASE_URL}/users/${_id}`,
            data: values,
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //เมอขอมลสงกลบมำตองเชคสถำนะกอนวำ username ซำหรอไม
            //โดยserver จะสง object ทชอวำ status และ message กลบมำ
            if (results.data.status) {
                dispatch({ type: 'SAVE_USER_REJECTED', payload: results.data.message })
            } else {
                dispatch({ type: 'SAVE_USER_SUCCESS' })
            }
        }).catch(err => {
            //กรณ error
            dispatch({ type: 'SAVE_USER_REJECTED', payload: err.message })
        })
    }
}



//ฟงกชนลบขอมลผใชตำม id ทสงเขำมำ
export const deleteUser = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}/users/${id}`, {
            //ตองสง heder ชอ authorization โดยสง token เขำไปดวยครบ
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            //ลบขอมลสำเรจ
            dispatch({ type: 'DELETE_USER_SUCCESS' })
        }).catch(err => {
            //กรณ error
            dispatch({ type: 'DELETE_USER_REJECTED', payload: err.message })
        })
    }
}
//ฟงกชนสำหรบ reset คำ status เพอลำงขอควำม error ทคำงอย
export const resetStatus = () => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_USER_SUCCESS' })
    }
}