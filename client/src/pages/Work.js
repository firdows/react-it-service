import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader } from 'reactstrap'
import { Link, browserHistory } from 'react-router'
///--
import {
    loadWorks, deleteWork
} from '../redux/actions/workActions'
import WorkTable from '../components/Work/WorkTable'
import WorkForm from './Work/WorkFormUser'


class Work extends Component {

    state = {
        modal: false,
        modalTitle: '',
    }

    componentDidMount() {
        this.props.dispatch(loadWorks())
    }


    render() {
        const { works } = this.props;


        if (works.isRejected) {
            return <div>{works.data}</div>
        }

        if (works.isLoading) {
            return <div>Loading...</div>
        }


        return (
            <div>
                <h3>Work</h3>

                <p>
                    <Link to={"/work/new"}>
                        <Button color="success" size="sm" >
                            เพิ่มข้อมูล
                    </Button>
                    </Link>
                </p>

                <WorkTable
                    data={works.data}
                    buttonEdit={this.handleEdit}
                    buttonDelete={this.handleDelete}
                    buttonView={this.handleView}
                />


                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader >{this.state.modalTitle}</ModalHeader>
                    <WorkForm onToggle={this.toggle} data={this.props.work} />
                </Modal>

            </div>
        )
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    handleNew = () => {
        this.setState({
            modalTitle: 'แจ้งปัญหา'
        })
        this.toggle()
    }

    handleView = (id) => {
        browserHistory.push(`/work/view/${id}`)
    }

    handleEdit = (id) => {
        browserHistory.push(`/work/update/${id}`)
    }

    handleDelete = (id) => {
        this.props.dispatch(deleteWork(id)).then(() => {
            this.props.dispatch(loadWorks())
        })
    }

}

function mapStateToProps(state) {
    return {
        works: state.workReducers.works,
        work: state.workReducers.work,
        workSave: state.workReducers.workSave,
    }

}

export default connect(mapStateToProps)(Work)
