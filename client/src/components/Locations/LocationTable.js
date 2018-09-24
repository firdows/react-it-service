import React, { Component } from 'react'
import { Table, Button, ButtonGroup } from 'reactstrap'

export default class LocationTable extends Component {
    render() {
        const { data, btnDelete, btnEdit, btnView } = this.props;

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(local => {
                        return (
                            <tr key={local.id}>
                                <td>{local.id}</td>
                                <td>{local.code}</td>
                                <td>{local.name}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button color='secondary' onClick={() => btnView(local.id)}>ดู</Button>
                                        <Button color='primary' onClick={() => btnEdit(local.id)}>แก้ไข</Button>
                                        <Button color='danger' onClick={() => btnDelete(local.id)}>ลบ</Button>
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
