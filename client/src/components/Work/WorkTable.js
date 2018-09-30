import React, { Component } from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap';
import moment from 'moment'
import 'moment/locale/th'
import {
    getStatusLabel
} from '../../redux/actions/workActions'

export default class WorkTable extends Component {
    render() {
        const { data, buttonEdit, buttonDelete, buttonView } = this.props;

        // if (data) {
        //     return <div>{data}</div>
        // }

        var i = 0;
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="120" className="text-center">#</th>
                        <th>วันที่แจ้ง</th>
                        <th>หัวข้อ</th>
                        <th>ปัญหาที่แจ้ง</th>
                        <th>สถานที่</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ขอมลทไดรบมำ */}

                    {data && data.map(e => {

                        let btn = '';


                        if (e.status === '0') {
                            btn = (
                                <ButtonGroup className="btn-group-justified">
                                    <Button color="secondary" size="sm"
                                        onClick={() => buttonView(e.id)}>ดู</Button>

                                    <Button color="primary" size="sm"
                                        onClick={() => buttonEdit(e.id)}>แกไข</Button>

                                    <Button color="danger" size="sm"
                                        onClick={() => buttonDelete(e.id)}>ลบ</Button>
                                </ButtonGroup>);

                        } else {
                            btn = (<ButtonGroup className="btn-group-justified">
                                <Button color="secondary" size="sm"
                                    onClick={() => buttonView(e.id)}>ดู</Button>


                            </ButtonGroup>);
                        }
                        //console.log(e);
                        return (
                            <tr key={e.id}>
                                <td className="text-center">
                                    {++i}
                                </td>
                                <td>{e.doc_date && moment(e.doc_date).local('th').format('ll')} {e.doc_time}</td>
                                <td>{e.title}</td>
                                <td>{e.detail}</td>
                                <td>{e.location && e.location.name}</td>
                                <td>{getStatusLabel(e.status)}</td>
                                <td className="text-center">
                                    {btn}

                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
