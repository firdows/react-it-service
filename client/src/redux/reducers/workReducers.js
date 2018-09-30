const initialState = {
    works: { data: null, isLoading: true, isRejected: false },
    work: { data: null, isLoading: true, isRejected: false },
    workDelete: { success: false, isLoading: true, isRejected: false },
    workSave: { data: null, isLoading: true, isRejected: false },
}

export default (state = initialState, action) => {
    switch (action.type) {
        //works
        case 'LOAD_WORKS_PENDING':
            return { ...state, works: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_WORKS_SUCCESS':
            return { ...state, works: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_WORKS_REJECTED':
            return { ...state, works: { data: action.payload, isLoading: false, isRejected: true } }

        //work
        case 'LOAD_WORK_BEFORE':
            return { ...state, work: { data: null, isLoading: false, isRejected: false } }
        case 'LOAD_WORK_PENDING':
            return { ...state, work: { data: null, isLoading: true, isRejected: false } }
        case 'LOAD_WORK_SUCCESS':
            return { ...state, work: { data: action.payload, isLoading: false, isRejected: false } }
        case 'LOAD_WORK_REJECTED':
            return { ...state, work: { data: action.payload, isLoading: false, isRejected: true } }

        //work delete        
        case 'DELETE_WORK_SUCCESS':
            return { ...state, workDelete: { data: true, isLoading: false, isRejected: false } }
        case 'DELETE_WORK_REJECTED':
            return { ...state, workDelete: { data: action.payload, isLoading: false, isRejected: true } }

        //work save        
        case 'SAVE_WORK_SUCCESS':
            return { ...state, workSave: { data: null, isLoading: false, isRejected: false } }
        case 'SAVE_WORK_REJECTED':
            return { ...state, workSave: { data: action.payload, isLoading: false, isRejected: true } }

        default:
            return state;
    }
}