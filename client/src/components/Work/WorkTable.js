import React, { Component } from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap';
import moment from 'moment'
import 'moment/locale/th'

export default class WorkTable extends Component {
    render() {
        const { data, buttonNew, buttonEdit, buttonDelete, buttonView } = this.props
        var i = 0;
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="120" className="text-center">#</th>
                        <th>วันที่แจ้ง</th>
                        <th>ปัญหาที่แจ้ง</th>
                        <th>สถานที่</th>
                        <th>สถานะ</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ขอมลทไดรบมำ */}

                    {data && data.map(e => {
                        //console.log(e);
                        return (
                            <tr key={e.id}>
                                <td className="text-center">
                                    {++i}
                                </td>
                                <td>{moment(e.doc_date).local('th').format('ll')}</td>
                                <td>{e.detail}</td>
                                <td>{e.location_name}</td>
                                <td>{e.status}</td>
                                <td className="text-center">
                                    <ButtonGroup>
                                        <Button color="secondary" size="sm"
                                            onClick={() => buttonView(e.id)}>ดู</Button>

                                        <Button color="primary" size="sm"
                                            onClick={() => buttonEdit(e.id)}>แกไข</Button>

                                        <Button color="danger" size="sm"
                                            onClick={() => buttonDelete(e.id)}>ลบ</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
