import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWork, getStatusLabel } from '../../redux/actions/workActions';
import { Table } from 'reactstrap'
import moment from 'moment'

class WorkView extends Component {
    componentDidMount() {
        var workId = this.props.params.id
        this.props.dispatch(getWork(workId))
    }



    render() {
        const { work } = this.props
        const { data } = work

        if (work.isRejected)
            return <div>{work.data}</div>

        if (work.isLoading)
            return <div>Loading....</div>

        return (
            <div>
                <h3>{data.title}</h3>
                <Table>
                    <tbody>
                        <tr>
                            <th>วันที่แจ้ง</th>
                            <td>{data.doc_date && moment(data.doc_date).format('ll')} {data.doc_time}</td>
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
                            <td>{data.location && data.location.name}</td>
                        </tr>
                        <tr>
                            <th>โทรศัพท์ติดต่อ</th>
                            <td>{data.phone}</td>
                        </tr>
                        <tr>
                            <th>สถานะ</th>
                            <td>{data.status && getStatusLabel(data.status)}</td>
                        </tr>
                    </tbody>
                </Table>

                {data.status_date &&
                    <Table>
                        <tbody>
                            <tr>
                                <th>การซ่อม</th>
                                <td>{data.work_detail}</td>
                            </tr>
                            <tr>
                                <th>เมื่อ</th>
                                <td>{moment(data.status_date).format('ll')}</td>
                            </tr>
                            <tr>
                                <th>โดย</th>
                                <td>{data.workUser && data.workUser.name}</td>
                            </tr>
                        </tbody>
                    </Table>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        work: state.workReducers.work,
    }

}

export default connect(mapStateToProps)(WorkView)