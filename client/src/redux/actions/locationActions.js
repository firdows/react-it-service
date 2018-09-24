import axios from 'axios'
import config from '../../configure'

const BASE_URL = config.BASE_URL

export const loadLocations = (term = '') => {
    return (dispatch) => {
        dispatch({ type: 'LOAD_LOCATIONS_PENDING' })
        
        return axios.get(`${BASE_URL}/locations?term=${term}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(results => {
            dispatch({ type: 'LOAD_LOCATIONS_SUCCESS', payload: results.data })
        }).catch(err => {
            dispatch({ type: 'LOAD_LACATIONS_REJECTED', payload: err.message })
        })
    }
}
