import React, { Component } from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap';
//แสดงรำยชอขอมลผใช แสดงแบบ HTML TABLE
class UserTable extends Component {
    render() {
        //Destructuring คำ props ทสงมำจำก  src / pages / User.js
        const { data, buttonNew, buttonEdit, buttonDelete, buttonView } = this.props
        console.log(data);
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="120" className="text-center">ประเภทผู้ใช้</th>
                        <th>ไอดี</th>
                        <th>ชอ-สกล</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th width="150" className="text-center">
                            <Button color="success" size="sm" onClick={buttonNew}>
                                เพิ่มข้อมูล
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ขอมลทไดรบมำ */}
                    {data && data.map(e => {
                        var id = e.id
                        return (
                            <tr key={e.id}>
                                <td className="text-center">
                                    {(e.user_type === 0) ? 'ทวไป' : 'ผดแลระบบ'}
                                </td>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.username}</td>
                                <td>{e.email}</td>
                                <td className="text-center">
                                    <ButtonGroup>
                                        <Button color="secondary" size="sm"
                                            onClick={() => buttonView(id)}>ดู</Button>

                                        <Button color="primary" size="sm"
                                            onClick={() => buttonEdit(id)}>แกไข</Button>

                                        <Button color="danger" size="sm"
                                            onClick={() => buttonDelete(id)}>ลบ</Button>
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
export default UserTable