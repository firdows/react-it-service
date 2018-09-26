import React, { Component } from 'react'
import { Button, ModalBody, ModalFooter } from 'reactstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
///---
import { saveWork, getWork } from '../../redux/actions/workActions'
import renderField from '../../Utils/renderFields'

export class WorkFormUser extends Component {

    componentDidMount() {
        const workId = (this.props.params.id) ? this.props.params.id : 0
        this.props.dispatch(getWork(workId)).then(() => {
            this.handleInitialize()
        })
    }

    handleInitialize() {
        let initData = {
            "location_id": 'foo',
        }

        if (this.props.work.data) {
            initData = this.props.work.data
        }
        this.props.initialize(initData);
    }




    render() {
        const { handleSubmit, work } = this.props
        const { data } = work

        if (work.isRejected) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        if (work.isLoading) {
            return <div>Loading...</div>
        }


        const caption = (data) ? "แก้ไขรายการแจ้งซ่อม" : "เพิ่มรายการแจ้งซ่อม"
        return (
            <div>
                <h3>{caption}</h3>

                <Field name="doc_date" component={renderField} type="text" label="รหัส" />

                <Button>บันทึก</Button>
                <Button onClick={this.toggle}>ยกเลิก</Button>

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
            browserHistory.push('/work')
        })
    }
}

//validate ขอมลกอน submit
function validate(values) {
    const errors = {};
    if (!values.doc_date) {
        errors.doc_date = 'จำเป็นต้องกรอกรหส !';
    }

    if (!values.detail) {
        errors.detail = 'จำเป็นต้องกรอกรำยละเอียด';
    }

    if (values.location_id === "foo") {
        errors.location_id = 'ต้องเลือกสถำนที่';
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
        work: state.workReducers.work
    }
}
export default connect(mapStateToProps)(form(WorkFormUser))
