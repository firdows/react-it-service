import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader} from 'reactstrap'
import {
    loadLocations
} from '../redux/actions/locationActions'
import LocationTable from '../components/Locations/LocationTable'

class Location extends Component {
    state = {
        modal: false,
        modalTitle: '',
    }


    componentDidMount() {
        this.props.dispatch(loadLocations())
    }


    render() {
        const { locations, location, locationSave } = this.props

        console.log(locations.data);
        return (
            <div>
                <h4>สถานที่</h4>
                <p>
                    <Button color="success" size="sm" onClick={this.handleNew}>
                        เพิ่มสถานที
                    </Button>
                </p>

                <LocationTable data={locations.data} />


                <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-primary" >
                    <ModalHeader >
                        {this.state.modalTitle}สถานที่
                    </ModalHeader>
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
            modalTitle: 'เพิ่ม'
        })
        this.toggle();
        console.log(this.state.modal);
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