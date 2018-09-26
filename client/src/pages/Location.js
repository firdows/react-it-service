import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { Button, Modal, ModalHeader } from 'reactstrap'
import {
    loadLocations,
    getLocation,
    saveLocation,
    resetStatus,
    deleteLocation
} from '../redux/actions/locationActions'
import { confirmModalDialog } from '../Utils/reactConfirmModalDialog'
import LocationTable from '../components/Locations/LocationTable'
import LocationForm from '../components/Locations/LocationForm'
import $ from 'jquery'

class Location extends Component {
    state = {
        modal: false,
        modalTitle: '',
    }


    componentDidMount() {
        this.props.dispatch(loadLocations()).then(() => {
            // $(function () {
            //     $("button").delay(3000).text(555);
            // });
        })

    }


    render() {
       
        const { locations, location, locationSave } = this.props

        //console.log(locations.data);

        if (locations.isRejectd) {
            return <div>{locations.data}</div>
        }      


        return (
            <div>
                <h4>สถานที่</h4>
                <p>
                    <Button color="success" size="sm" onClick={this.handleNew}>
                        เพิ่มสถานที
                    </Button>
                </p>

                {locations.isLoading && <div>Loading...</div>}

                <LocationTable
                    data={locations.data}
                    btnDelete={this.handleDelete}
                    btnEdit={this.handleEdit}
                    btnView={this.handleView}
                />


                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary" >
                    <ModalHeader >
                        {this.state.modalTitle}สถานที่
                    </ModalHeader>
                    <LocationForm
                        data={location.data}
                        locationSave={locationSave}
                        onSubmit={this.handleSubmit}
                        onToggle={this.toggle}
                    />
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
        this.props.dispatch(resetStatus())
        this.props.location.data = []
        this.setState({
            modalTitle: 'เพิ่ม'
        })
        this.toggle();
        //console.log(this.state.modal);
    }

    handleSubmit = (values) => {
        this.props.dispatch(saveLocation(values)).then(() => {
            if (!this.props.locationSave.isRejected) {
                this.toggle()
                this.props.dispatch(loadLocations());
            }
        })
    }

    handleEdit = (id) => {
        this.props.dispatch(resetStatus())
        this.setState({ modalTitle: 'แกไข' })
        this.props.dispatch(getLocation(id)).then(() => {
            this.toggle()
        })
    }

    handleView = (id) => {
        browserHistory.push(`/location/${id}`);
    }


    handleDelete = (id) => {
        confirmModalDialog({
            show: true,
            title: 'ยืนยันการลบ',
            message: 'คุณต้องการลบข้อมูลนี้ใช่หรือไม่',
            confirmLabel: 'ยืนยัน ลบทันที่!!',
            onConfirm: () => this.props.dispatch(deleteLocation(id)).then(() => {
                this.props.dispatch(loadLocations())
            })
        })
    }
}


function mapStateToProps(state) {
    return {
        locations: state.locationReducers.locations,
        location: state.locationReducers.location,
        locationDelete: state.locationReducers.locationDelete,
        locationSave: state.locationReducers.locationSave
    }
}
export default connect(mapStateToProps)(Location)