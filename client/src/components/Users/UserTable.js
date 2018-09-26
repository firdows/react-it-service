import React, { Component } from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap';
//แสดงรำยชอขอมลผใช แสดงแบบ HTML TABLE
class UserTable extends Component {
    render() {
        //Destructuring คำ props ทสงมำจำก  src / pages / User.js
        const { data, buttonNew, buttonEdit, buttonDelete, buttonView } = this.props
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th width="120" className="text-center">ประเภทผู้ใช้</th>
                        <th>ชอ-สกล</th>
                        <th>Username</th>
                        <th width="150" className="text-center">
                            <Button color="success" size="sm" onClick={buttonNew}>
                                เพมขอมล
                            </Button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop ขอมลทไดรบมำ */}
                    {data && data.map(e => {
                        return (
                            <tr key={e.id}>
                                <td className="text-center">
                                    {(e.user_type === 0) ? 'ทวไป' : 'ผดแลระบบ'}
                                </td>
                                <td>{e.name}</td>
                                <td>{e.username}</td>
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
export default UserTable