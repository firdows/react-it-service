import axios from 'axios'
import config from '../../configure'

const BASE_URL = config.BASE_URL

export const loadWorks = (term = '') => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_workS_PENDING' })

        return axios.get(`${BASE_URL}/works?term=${term}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_WORKS_SUCCESS', payload: results.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_WORKS_REJECTED', payload: err.message })
        })
    }
}

export const getWork = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_WORK_PENDING' })
        return axios.get(`${BASE_URL}/works/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_WORK_SUCCESS', payload: results.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_WORK_REJECTED', payload: err.message })
        })
    }
}

export const saveWork = (values) => {
    let _id = ''
    let _method = 'post'
    if (values.id) {
        _id = values.id
        _method = 'put'
    }
    return (dispatch) => {
        return axios({
            method: _method,
            url: `${BASE_URL}/works/${_id}`,
            data: values,
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            if (results.data.status) {
                dispatch({ type: 'SAVE_WORK_REJECTED', payload: results.data.message })
            } else {
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
            headers: { authorization: localStorage.getItem('token') }
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
