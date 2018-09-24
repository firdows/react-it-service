import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'reactstrap';
import {Field, reduxForm} from 'redux-form';
import {signin} from '../../redux/actions/authActions'
import renderField from '../../Utils/renderFields'
class Signin extends Component {
    render() {
        const {handleSubmit} = this.props
        return (
            <div className="row">
                <div className="col-6 mx-auto">
                    <div className="card mb-3">
                        <h4 className="card-header">เข้าสู้ระบบ</h4>
                        <div className="card-body">

                            <Field name="username" component={renderField} type="text" label="Username"/>
                            <Field
                                name="password"
                                component={renderField}
                                type="password"
                                label="Password"/> 
                            {this.renderAlert()}
                        </div>
                        <div className="card-footer text-center">
                            <Button color="primary" onClick={handleSubmit(this.onSubmit)}>Sign in</Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // สำหรบ submit คำจำกฟอรม เนองจำกฟอรมเรำใช redux-form มนจะสงมำเปน object
    // ทำใหสะดวกในกำรใชงำน เชน {username: "admin", password: "1234"}
    onSubmit = (values) => {
        this
            .props
            .dispatch(signin(values))
    }
    //Alert กรณ Signin ไมผำน รบคำจำก props ทไดจำก reducer ท map ไวเพอแสดง error
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong> Warning: 
                    </strong> {this.props.errorMessage}
                </div>
            )
        }
    }
}

//รปแบบในกำร validate ของ redux-form
function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = 'จำเปนตอง Username';
    }
    if (!values.password) {
        errors.password = 'จำเปนตองกรอก Password !';
    }
    return errors;
}
// สรำง form เพอเรยกใช redux-form ชอฟอรมทกำหนด signinForm จะตองไมซำกนในโปรเจค
// หำกมกำร validate กใหกำหนดโดยในทนฟงกชนในกำร validate ชอเดยวกบกำรกำหนด validate
const form = reduxForm({form: 'signinForm', validate})
function mapStateToProps(state) {
    return {
        errorMessage: state.authReducers.error //กรณ Signin ไมผำน
    }
}
// ในกำร connect หำกมกำรใช redux-form ใหกำหนดตำมรปแบบดำนลำง โดยตองเอำ form
// มำครอบ Component ของเรำไวเปนรแบบของ HOC
export default connect(mapStateToProps)(form(Signin))