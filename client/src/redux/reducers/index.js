import { combineReducers } from 'redux'
// redux-form จะทำกำรเกบ state และม reducer ในตวของมนเอง ดงนนเวลำเรำจะใชงำน
// redux-form เรำตองทำเหมอนวำมนคอ reducer ตวหนงดวยครบ
import { reducer as formReducer } from 'redux-form'
import authReducers from './authReducers'
import userReducers from './userReducers'


const rootReducers = combineReducers({
    form: formReducer, //กำหนดชอ reducer ไววำชอ form นะครบตำมคำแนะนำของ redux-form
    authReducers,
    userReducers
})
export default rootReducers