import React, { Component } from 'react'
import { Button, ModalFooter, Table } from 'reactstrap';
class UserView extends Component {

    render() {
        //redux-form จะม props ทชอ handleSubmit เพอใช submit คำ
        let { id, user_type, name, username } = this.props.data;
        console.log('user-view:');
        console.log(this.props.data);

        user_type = user_type.toString();
        return (
            <div>
                <Table>
                    <tr>
                        <th className="text-right" width='150'>Name :</th>
                        <td>{name}</td>
                    </tr>
                    <tr>
                        <th className="text-right">User Type :</th>
                        <td>{user_type === 1 ? 'ผู้ดูแลระบบ' : 'ผู้ใช้ทั่วไป'}</td>
                    </tr>
                    <tr>
                        <th className="text-right">Username :</th>
                        <td>{username}</td>
                    </tr>
                </Table>
                <ModalFooter>
                    <Button color="secondary" onClick={this.toggle}>ยกเลิก</Button>
                </ModalFooter>
            </div>
        )
    }

    toggle = () => {
        this.props.onToggle()
    }

}

//สงเกตวำไมมกำรใช connect เลยเพรำะเรำไมไดเปนตวจดกำร data โดยตรง
//แตสงสงตำงผำน props ทไดจำก src/pages/User.js
export default UserView