import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import moment from 'moment'
import { Table } from 'reactstrap'
///---
import { saveWork, getWork, saveRepair, getItemStatusLabel } from '../../redux/actions/workActions'
import renderField from '../../Utils/renderFields'

export class WorkFormRepair extends Component {

    componentDidMount() {
        const workId = (this.props.params.id) ? this.props.params.id : null
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
        const datetime = (data) ? `${moment(data.doc_date).format('ll')} ${data.doc_time}` : moment().format('lll');


        if (work.isRejected) {
            return <div className="alert alert-danger">Error: {data}</div>
        }
        if (work.isLoading) {
            return <div>Loading...</div>
        }
        //const itemsStatus = getItemStatusLabel
        delete getItemStatusLabel[0]
        const itemsStatus = Object.entries(getItemStatusLabel);
        console.log(itemsStatus);
        console.log(data);


        const caption = (data) ? "แก้ไขรายการแจ้งซ่อม" : "เพิ่มรายการแจ้งซ่อม"

        return (
            <div>
                <h3>{caption}</h3>

                {workSave.isRejected && <div className="alert alert-danger">{workSave.data}</div>}

                <Table>
                    <tbody>
                        <tr>
                            <th>วันที่แจ้ง</th>
                            <td>{datetime}</td>
                        </tr>
                        <tr>
                            <th>ชื่อเรื่อง</th>
                            <td>{data.title}</td>
                        </tr>
                        <tr>
                            <th>ปัญหา</th>
                            <td>{data.detail}</td>
                        </tr>
                        <tr>
                            <th>สถานที่</th>
                            <td>{data.location.name}</td>
                        </tr>
                        <tr>
                            <th>โทรศัพท์ติดต่อ</th>
                            <td>{data.phone}</td>
                        </tr>
                    </tbody>
                </Table>

                <form>
                    <div className="row">
                        <div className="col-sm-3">สถานะ</div>
                        <div className="col-sm-9">
                            {itemsStatus && itemsStatus.map(([key, value]) => {
                                return (
                                    // <div>
                                    //     <input type="radio" name="status" value={key} id={`status${key}`} />
                                    //     {' '}<label htmlFor={`status${key}`}>{value}</label>
                                    // </div>
                                    <div className="form-check form-check-inline">
                                        <label>
                                            <Field
                                                type="radio"
                                                name="status"
                                                component="input"
                                                value={key}
                                                className="form-check-input"
                                            />{value}
                                        </label>
                                    </div>
                                )
                            })}
                            {console.log(itemsStatus)}
                        </div>
                    </div>
                    <Field name="work_detail" component={renderField} label="การซ่อม" textarea />
                    <hr />

                    <div className="row">
                        <div className="col-sm-3">{' '}</div>
                        <div className="col-sm-9">
                            <Button color='success' onClick={handleSubmit(this.onSubmit)}>บันทึก</Button>{' '}
                            <Button onClick={this.onCancel}>ยกเลิก</Button>
                        </div>
                    </div>
                </form>

            </div>
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

    //ฟังก์ชันบันทึกข้่อมูล
    onSubmit = (values) => {
        //เมื่อบันทึกข้อมูลเสร็จสังให้ไปยัง route /work

        this.props.dispatch(saveRepair(values)).then(() => {
            if (!this.props.workSave.isRejected) {
                browserHistory.push('/work/repair')
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

    if (!values.work_detail) {
        errors.work_detail = 'จำเป็นต้องกรอกรายละเอียด';
    }

    return errors;
}


const form = reduxForm({
    form: 'WorkFormRepair',
    validate
})

function mapStateToProps(state) {
    return {
        work: state.workReducers.work,
        workSave: state.workReducers.workSave
    }
}
export default connect(mapStateToProps)(form(WorkFormRepair))
