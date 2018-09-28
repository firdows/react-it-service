import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import renderField from '../../Utils/renderFields'
class UserForm extends Component {
    componentDidMount() {
        //เรยกใชฟงกชนในกำรกำหนด value ใหกบ textbox และ control ตำงๆ
        this.handleInitialize()
    }
    //กำหนดคำ value ใหกบ textbox หรอ control ตำงๆ ในฟอรม
    //ถำเปน HTML ธรรมดำกจะกำหนดเปน value="xxx" แตสำหรบ redux-form
    //ตองใช initialize ถำเปน redux-form v.6 ตองประกำศใช initialize แต v.7 เรยกใชไดเลย
    handleInitialize() {
        let initData = {
            "user_type": "0",
            "name": '',
            "username": '',
            "password": ''
        };
        //ตรวจสอบกอนวำม data.id หรอไม
        //ถำไมมแสดงวำเปนกำรสรำงรำยกำรใหม
        //ถำมแสดงวำมกำร get ขอมลผู้ใช้งานจงเปนกำรปรบปรง
        if (this.props.data.id) {
            initData = this.props.data

            console.log("user-form:");
            console.log(initData);
            //user_type ทรบมำเปน init แตvalue ตองแปลงเปน string กอน
            initData.user_type = this.props.data.user_type.toString()
        }
        this.props.initialize(initData);
    }


    render() {
        //redux-form จะม props ทชอ handleSubmit เพอใช submit คำ

        const { handleSubmit, userSave } = this.props
        return (
            <div>
                <ModalBody>
                    {/* ตรวจสอบวำม err หรอไม */}
                    {userSave.isRejected && <div className="alert alert-danger">{userSave.data}</div>}
                    {/* รปแบบกำรแสดงผลจดตำม Bootstrap 4 */}
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label">ประเภทผใช</label>
                        <div className="col-sm-9">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <Field
                                        className="form-check-input"
                                        name="user_type"
                                        component="input"
                                        type="radio"
                                        value='0'
                                    />{' '}
                                    ทวไป
                                    </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <Field
                                        className="form-check-input"
                                        name="user_type"
                                        component="input"
                                        type="radio"
                                        value="1"
                                    />{' '}ผดแลระบบ
                                    </label>
                            </div>
                        </div>
                    </div>
                    <Field name="email" component={renderField} type="text" label="Email" autoFocus />
                    <Field name="name" component={renderField} type="text" label="ชอ-สกล" />
                    <Field name="username" component={renderField} type="text" label="Username" />
                    <Field name="password" component={renderField} type="password" label="Password" />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit(this.onSubmit)}>บนทก</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>ยกเลก</Button>
                </ModalFooter>
            </div>
        )
    }
    //ฟงกชนนเรยกใช props ชอ onToggle จำก src/pages/User.js เพอปด Modal
    toggle = () => {
        this.props.onToggle()
    }
    //ฟงกชนสงกำรคำกำร submit โดยสงใหฟงกชนชอ onSubmit ทไดจำก props
    onSubmit = (values) => {
        this.props.onSubmit(values);
    }
}
//validate ขอมลกอน submit
function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'จำเป็นต้องกรอกชื่อ-สกุล';
    }
    if (!values.username) {
        errors.username = 'จำเปนตองกรอก Username !';
    } else if (values.username.length < 3) {
        errors.username = 'Username ตองมากกวำ 3 ตัวอักษร !';
    }
    return errors;
}
//เรยกใช redux-form โดยใหมกำรเรยกใชกำร validate ดวย
const form = reduxForm({
    form: 'UserForm',
    validate
})
//สงเกตวำไมมกำรใช connect เลยเพรำะเรำไมไดเปนตวจดกำร data โดยตรง
//แตสงสงตำงผำน props ทไดจำก src/pages/User.js
export default form(UserForm)