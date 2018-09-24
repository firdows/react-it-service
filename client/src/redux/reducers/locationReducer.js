const initialState = {
    locations: { data: null, isLoading: true, isRejected: false },
    location: { data: null, isLoading: true, isRejected: false },
    locationDelete: { success: false, isLoading: true, isRejected: false },
    locationSave: { success: false, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        //locations
        case 'LOAD_LACATIONS_PENDING':
            return { ...state, locations: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_LACATIONS_SUCCESS':
            return { ...state, locations: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_LACATIONS_REJECTED':
            return { ...state, locations: { data: action.payload, isLoading: false, isRejected: true } }

        //location
        case 'LOAD_LACATION_PENDING':
            return { ...state, location: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_LACATION_SUCCESS':
            return { ...state, location: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_LACATION_REJECTED':
            return { ...state, location: { data: action.payload, isLoading: false, isRejected: true } }

        //location delete        
        case 'DELETE_LACATION_SUCCESS':
            return { ...state, locationDelete: { data: true, isLoading: false, isRejected: false } }
        case 'DELETE_LACATION_REJECTED':
            return { ...state, locationDelete: { data: action.payload, isLoading: false, isRejected: true } }

        //location save        
        case 'SAVE_LACATION_SUCCESS':
            return { ...state, locationSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_LACATION_REJECTED':
            return { ...state, locationSave: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state;
    }


}
