import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
///---
import { saveWork, getWork } from '../../redux/actions/workActions'
import renderField from '../../Utils/renderFields'
import renderLocations from '../../Utils/renderLocations'

export class WorkFormUser extends Component {

    
    componentDidMount() {
        //this.props.dispatch("")
        this.props.dispatch({ type: 'LOAD_WORK_BEFORE' });
        const workId = (this.props.params.id) ? this.props.params.id : null
        console.log('workId:')
        console.log(workId);
        if (workId) {
            this.props.dispatch(getWork(workId)).then(() => {
                this.handleInitialize()
            })
        } else {
            this.handleInitialize()
        }

    }

    handleInitialize() {
        let initData = {
            "location_id": 'foo',
            'title': '',
        }
        if (this.props.work.data) {
            initData = this.props.work.data
        }
        this.props.initialize(initData);
    }





    render() {

        const { handleSubmit, work, workSave } = this.props
        const { data } = work
        const datetime = (data) ? `${moment(data.doc_date).format('YYYY-MM-DD')} ${data.doc_time}` : moment().format('lll');

        if (work.isRejected) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        if (work.isLoading) {
            return <div >Loading...</div>
        }


        const caption = (data) ? "แก้ไขรายการแจ้งซ่อม" : "เพิ่มรายการแจ้งซ่อม"
        return (
            <div>
                <h3>{caption}</h3>

                {workSave.isRejected && <div className="alert alert-danger">{workSave.data}</div>}

                <div className="form-group row">
                    <label htmlFor="" className="col-sm-3 col-form-label">
                        วันที่แจ้ง
                    </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-contrl-plaintext" value={datetime} readOnly />
                    </div>
                </div>

                <Field name="title" component={renderField} label="ชื่อเรื่อง" />
                <Field name="detail" component={renderField} label="ปัญหา" textarea />
                <Field name="location_id" component={renderLocations} label="สถานที่" />
                <Field name="phone" component={renderField} label="โทรศัพท์ติดต่อ" />
                <hr />
                <div className="row">
                    <div className="col-sm-3">{' '}</div>
                    <div className="col-sm-9">
                        <Button color='success' onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                        <Button onClick={this.onCancel}>ยกเลิก</Button>
                    </div>
                </div>


            </div>
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันบันทึกข้่อมูล
    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /work

        this.props.dispatch(saveWork(values)).then(() => {
            if (!this.props.workSave.isRejected) {
                browserHistory.push('/work')
            }
        })
    }

    onCancel = () => {
        browserHistory.push('/work')
    }
}

//validate ขอมลกอน submit
function validate(values) {
    const errors = {};
    if (!values.doc_date) {
        errors.doc_date = 'จำเป็นต้องกรอกรหัส !';
    }

    if (!values.detail) {
        errors.detail = 'จำเป็นต้องกรอกรายละเอียด';
    }

    if (values.location_id === "foo") {
        errors.location_id = 'ต้องเลือกสถานที่';
    }

    if (!values.phone) {
        errors.phone = 'จำเป็นต้องกรอกโทรศัพท์';
    }
    return errors;
}


const form = reduxForm({
    form: 'WorkFormUser',
    validate
})

function mapStateToProps(state) {
    return {
        work: state.workReducers.work,
        workSave: state.workReducers.workSave
    }
}
export default connect(mapStateToProps)(form(WorkFormUser))
