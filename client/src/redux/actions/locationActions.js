import axios from 'axios'
import config from '../../configure'

const BASE_URL = config.BASE_URL

export const loadLocations = (term = '') => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_LOCATIONS_PENDING' })

        return axios.get(`${BASE_URL}/locations?term=${term}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            console.log(results.data);

            dispatch({ type: 'LOAD_LOCATIONS_SUCCESS', payload: results.data.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_LOCATIONS_REJECTED', payload: err.message })
        })
    }
}

export const getLocation = (id) => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_LOCATION_PENDING' })
        return axios.get(`${BASE_URL}/locations/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_LOCATION_SUCCESS', payload: results.data.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_LACATION_REJECTED', payload: err.message })
        })
    }
}

export const saveLocation = (values) => {
    let _id = ''
    let _method = 'post'
    if (values.id) {
        _id = values.id
        _method = 'put'
    }
    return (dispatch) => {
        return axios({
            method: _method,
            url: `${BASE_URL}/locations/${_id}`,
            data: values,
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            if (results.data.status) {
                dispatch({ type: 'SAVE_LOCATION_REJECTED', payload: results.data.message })
            } else {
                dispatch({ type: 'SAVE_LOCATION_SUCCESS' })
            }
        }).catch(err => {
            console.log(err);
            dispatch({ type: 'SAVE_LOCATION_REJECTED', payload: err.message })
        })
    }
}

export const deleteLocation = (id) => {
    return (dispatch) => {
        return axios.delete(`${BASE_URL}/locations/${id}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'DELETE_LOCATION_SUCCESS' })
        }).catch(err => {
            dispatch({ type: 'DELETE_LOCATION_REJECTED', payload: err.message })
        })
    }

}




export const resetStatus = () => {
    return (dispatch) => {
        dispatch({ type: 'SAVE_LOCATION_SUCCESS' })
    }
}
