//Reducer เกบ State เกยวกบกำร Signin/Signout
export default (state = {}, action) => {
    switch (action.type) {
        case 'AUTH_USER':
            // Signin สำเรจ ประเดนสำคญคอกำหนดตวแปร authenticated เปน true และเกบคำ payload
            // จำก token ไวทตวแปร data
            return {
                ...state,
                authenticated: true,
                data: action.payload
            }
        case 'UNAUTH_USER':
            //กรณทมกำร Signout ประเดนสำคญคอกำหนดตวแปร authenticated เปน false
            return {
                ...state,
                authenticated: false,
                data: null,
                error: null
            }
        case 'AUTH_ERROR':
            //Signin ไมสำเรจ username หรอ password อำจไมถกตอง
            return {
                ...state,
                error: action.payload
            }
        case 'FETCH_MESSAGE':
            return {
                ...state,
                message: action.payload
            }
        case 'RELOAD_USER':
            return {
                ...state,
                authenticated: true,
                data: action.payload
            }
        default:
            return state
    }
}