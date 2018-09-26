import React, { Component } from 'react'
import { debounce } from 'lodash'
import { connect } from 'react-redux'
import { Modal, ModalHeader } from 'reactstrap';
///----
import {
  loadUsers, getUser, saveUser,
  deleteUser, resetStatus
} from '../redux/actions/userActions'
import { confirmModalDialog } from '../Utils/reactConfirmModalDialog'
import SearchBar from '../Utils/searchBar'
import UserTable from '../components/Users/UserTable'
import UserForm from '../components/Users/UserForm'
import UserView from '../components/Users/UserView'
import { reload_user } from '../redux/actions/authActions'

class User extends Component {
  //มกำรใช Modal ของ reactstrap ซงจะตองเกบ State กำรแสดง modal ไว
  state = {
    modal: false,
    modalTitle: '',
    modalView: false
  }
  //สง dispach ฟงกชน loadUsers
  componentDidMount() {
    this.props.dispatch(loadUsers())
  }



  render() {
    const { users, user, userSave, userData } = this.props
    if (users.isRejected) {
      //ถำม error
      return <div>{users.data}</div>
    }
    //debounce เปนกำรหนวงกำรสงตวอกษรเปนฟงกชนของ lodash ทำเพอเรยกใชกำร filter ขอมล
    const userSearch = debounce(term => { this.handleSearch(term) }, 500);
    return (
      <div>
        <h4>ผู้ใช้งาน</h4>
        <div className="form-group row">
          <div className="col-sm-6">
            {/* สง props onSearchTermChange ให Component SearchBar เพอ filgter
                    โดยฝง SearchBar จะนำไปใชกบ event onChange */}
            <SearchBar
              onSearchTermChange={userSearch}
              placeholder="คนหำ...ชอ-สกล, Username" />
          </div>
        </div>

        {/* แสดงขอควำม Loading กอน */}
        {users.isLoading && <div>Loading...</div>}
        {/* Component UserTable จะสง props ไป 4 ตว */}
        <UserTable
          data={users.data}
          buttonNew={this.handleNew}
          buttonEdit={this.handleEdit}
          buttonDelete={this.handleDelete}
          buttonView={this.handleView}
        />

        {/* เปน Component สำหรบแสดง Modal ของ reactstrap ซงเรำตองควบคมกำรแสดงไวทไฟลน ถำทำแยกไฟลจะควบคมยำกมำกครบ */}
        <Modal isOpen={this.state.modal} toggle={this.toggle}
          className="modal-primary" autoFocus={false}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}ผู้ใช้งาน</ModalHeader>
          {/* เรยกใชงำน Component UserForm และสง props ไปดวย 4 ตว */}
          <UserForm
            data={user.data}
            userSave={userSave}
            onSubmit={this.handleSubmit}
            onToggle={this.toggle} />
        </Modal>

        <Modal isOpen={this.state.modalView} toggle={this.toggleView}
          className="modal-info" autoFocus={false}>
          <ModalHeader toggle={this.toggleView}>{this.state.modalTitle}ผู้ใช้งาน</ModalHeader>
          {/* เรยกใชงำน Component UserForm และสง props ไปดวย 4 ตว */}
          <UserView data={user.data} onToggle={this.toggleView} />
        </Modal>
      </div>
    )
  }

  //ฟงกชนสงแสดง/ปด modal
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  toggleView = () => {
    this.setState({
      modalView: !this.state.modalView
    })
  }

  //ฟงกชน filter ขอมล
  handleSearch = (term) => {
    this.props.dispatch(loadUsers(term))
  }

  //ฟงกชนสรำงขอมลใหมโดยจะสงใหเปด Modal
  handleNew = () => {
    this.props.dispatch(resetStatus())
    this.props.user.data = []
    this.setState({ modalTitle: 'เพม' })
    this.toggle();
  }

  //ฟงกชนแกไขขอมล และสงใหเปด Modal โดยสงขอมลไปแปะใหกบฟอรมดวย
  handleEdit = (id) => {
    this.props.dispatch(resetStatus())
    this.setState({ modalTitle: 'แกไข' })
    this.props.dispatch(getUser(id)).then(() => {
      this.toggle()
    })
  }

  //ฟงกชนแกไขขอมล และสงใหเปด Modal โดยสงขอมลไปแปะใหกบฟอรมดวย
  handleView = (id) => {
    //this.props.dispatch(resetStatus())
    this.setState({ modalTitle: 'ดู' })
    this.props.dispatch(getUser(id)).then(() => {
      this.toggleView()
    })
  }

  //ฟงกชนบนทกขอมล
  handleSubmit = (values) => {
    this.props.dispatch(saveUser(values)).then((results) => {
      if (!this.props.userSave.isRejected) {
        this.toggle()
        this.props.dispatch(loadUsers())
      }
      // console.log(this.props.userData);
      // console.log(values);
      if (values.id == this.props.userData.sub) {
        this.props.dispatch(reload_user(this.props.userData.sub))
      }

    })
  }

  //ฟงกชนลบขอมล
  handleDelete = (id) => {
    confirmModalDialog({
      show: true,
      title: 'ยืนยันการลบ',
      message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
      confirmLabel: 'ยืนยัน ลบทันที่!!',
      onConfirm: () => this.props.dispatch(deleteUser(id)).then(() => {
        this.props.dispatch(loadUsers())
      })
    })
  }



}

function mapStateToProps(state) {
  return {
    users: state.userReducers.users,
    user: state.userReducers.user,
    userDelete: state.userReducers.userDelete,
    userSave: state.userReducers.userSave,
    userData: state.authReducers.data,
  }
}
export default connect(mapStateToProps)(User)
