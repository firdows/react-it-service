import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLocation } from '../../redux/actions/locationActions'


class View extends Component {

    componentDidMount() {
        var id = this.props.params.id.toString();
        this.props.dispatch(getLocation(id))
    }

    render() {
        const { location } = this.props;
        const { data } = location;
        // // const { id, code, name } = data;
        console.log(data);

        if (location.isRejected) {
            return <div>{location.data}</div>
        }

        if(location.isLoading){
            return <div>Loading...</div>
        }

        return (
            <div>
               <h2>Code : {data.code}</h2>
               <h2>Name : {data.name}</h2>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        locations: state.locationReducers.locations,
        location: state.locationReducers.location,
    }
}

export default connect(mapStateToProps)(View)
//export default View