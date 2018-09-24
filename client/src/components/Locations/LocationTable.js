import React, { Component } from 'react'
import { Table } from 'reactstrap'

export default class LocationTable extends Component {
    render() {
        const { data } = this.props;

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


                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}
