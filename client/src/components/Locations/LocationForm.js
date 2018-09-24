import React, { Component } from 'react'
import { ModalBody, ModalFooter, Button } from 'reactstrap'
import { Field, reduxForm } from 'redux-form';
import renderField from '../../Utils/renderFields'

class LocationForm extends Component {

    componentDidMount() {
        this.handleInitialize()
    }

    handleInitialize() {
        let initData = {
            "code": '',
            "name": '',
        }

        if (this.props.data.id) {
            initData = this.props.data
        }
        this.props.initialize(initData);
    }

    render() {
        const { handleSubmit, locationSave } = this.props

        return (
            <div>
                <ModalBody>
                    {locationSave.isRejected && <div className="alert alert-danger">{locationSave.data}</div>}

                    <Field name="code" component={renderField} type="text" label="รหัส" />
                    <Field name="name" component={renderField} type="text" label="ชื่อสถานที่" />



                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit(this.onSubmit)} color="primary">
                        บันทึก
                    </Button>
                    <Button onClick={this.toggle} color="default">ยกเลิก</Button>
                </ModalFooter>
            </div>
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

    onSubmit = (values) => {
        //alert(55);
        this.props.onSubmit(values);
    }
}

//validate ขอมลกอน submit
function validate(values) {
    const errors = {};
    if (!values.code) {
        errors.code = 'จำเป็นต้องกรอกรหส !';
    }
    if (!values.name) {
        errors.name = 'จำเปนตองกรอกชอสถำนท !';
    }
    return errors;
}


const form = reduxForm({
    form: 'LocationForm',
    validate
})

export default form(LocationForm)
