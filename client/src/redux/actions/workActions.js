import axios from 'axios'
import config from '../../configure'

const BASE_URL = config.BASE_URL
const PREFIX_TOKEN = config.PREFIX_TOKEN

export const loadWorks = (status = '') => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_WORKS_PENDING' })

        return axios.get(`${BASE_URL}/works?status=${status}`, {
            headers: { authorization: PREFIX_TOKEN + localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_WORKS_SUCCESS', payload: results.data.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_WORKS_REJECTED', payload: err.message })
        })
    }
}

export const getWork = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_WORK_PENDING' })
        id = id ? '/' + id : ''
        //console.log(`${BASE_URL}/works${id}`);
        return axios.get(`${BASE_URL}/works${id}`, {
            headers: { authorization: PREFIX_TOKEN + localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_WORK_SUCCESS', payload: results.data.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_WORK_REJECTED', payload: err.message })
        })
    }
}

export const saveWork = (values) => {
    let _id = ''
    let _method = 'post'
    if (values.id) {
        _id = '/' + values.id
        _method = 'put'
    }
    return (dispatch) => {
        return axios({
            method: _method,
            url: `${BASE_URL}/works${_id}`,
            data: values,
            headers: { authorization: PREFIX_TOKEN + localStorage.getItem('token') }
        }).then(results => {
            // console.log(results.data);
            // console.log(results.data.statusCode);
            if (results.data.statusCode === '500') {
                // console.log('SAVE_WORK_REJECTED');
                dispatch({ type: 'SAVE_WORK_REJECTED', payload: results.data.message })
            } else {
                // console.log('SAVE_WORK_SUCCESS');
                dispatch({ type: 'SAVE_WORK_SUCCESS' })
            }
        }).catch(err => {
            dispatch({ type: 'SAVE_WORK_REJECTED', payload: err.message })
        })
    }
}


export const saveRepair = (values) => {
    let _id = ''
    let _method = 'post'
    if (values.id) {
        _id = '/' + values.id
        _method = 'put'
    }
    return (dispatch) => {
        return axios({
            method: _method,
            url: `${BASE_URL}/works/repair${_id}`,
            data: values,
            headers: { authorization: PREFIX_TOKEN + localStorage.getItem('token') }
        }).then(results => {
            // console.log(results.data);
            // console.log(results.data.statusCode);
            if (results.data.statusCode === '500') {
                // console.log('SAVE_WORK_REJECTED');
                dispatch({ type: 'SAVE_WORK_REJECTED', payload: results.data.message })
            } else {
                // console.log('SAVE_WORK_SUCCESS');
                dispatch({ type: 'SAVE_WORK_SUCCESS' })
            }
        }).catch(err => {
            dispatch({ type: 'SAVE_WORK_REJECTED', payload: err.message })
        })
    }
}

export const deleteWork = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}/works/${id}`, {
            headers: { authorization: PREFIX_TOKEN + localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'DELETE_WORK_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'DELETE_WORK_REJECTED', payload: err.message })
        })
    }
}

export const resetStatus = () => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_WORK_SUCCESS' })
    }
}

export const getItemStatusLabel = {
    '0': 'แจ้งซ่อม',
    '1': 'รอซ่อม',
    '2': 'กำลังดำเนินการซ่อม',
    '3': 'ซ่อมเสร็จแล้ว'
}

export const getStatusLabel = ($status) => {
    const statusLabel = getItemStatusLabel;
    return statusLabel[$status]
}
