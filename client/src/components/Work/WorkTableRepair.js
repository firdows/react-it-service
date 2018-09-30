import React, { Component } from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap';
import moment from 'moment'
import 'moment/locale/th'
import {
   getStatusLabel
} from '../../redux/actions/workActions'

export default class WorkTableRepair extends Component {
    render() {
        const { data, btnRepair} = this.props;

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
                        //console.log(e);
                        return (
                            <tr key={e.id}>
                                <td className="text-center">
                                    {++i}
                                </td>
                                <td>{moment(e.doc_date).local('th').format('ll')} {e.doc_time}</td>
                                <td>{e.title}</td>
                                <td>{e.detail}</td>
                                <td>{e.location.name}</td>
                                <td>{getStatusLabel(e.status)}</td>
                                <td className="text-center">
                                    <ButtonGroup>
                                        <Button color="success" size="sm"
                                            onClick={() => btnRepair(e.id)}>ปฎิบัตงาน</Button>

                                       
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
