import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadLocations } from '../redux/actions/locationActions';

class renderLocations extends Component {

    componentDidMount() {
        this.props.dispatch(loadLocations())
    }

    render() {
        const { locations, label, input, meta: { touched, error } } = this.props;
        const { data } = locations;
        console.log(data);

        return (
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">{label}</label>
                <div className="col-sm-9">
                    <select {...input} className="form-control">
                        <option>เลือก{label}</option>
                        {data && data.map(d => {
                            return (<option value={d.id} key={d.id}>{d.name}</option>)
                        })}
                    </select>
                </div>
            </div>
        )
    }
}
function mapStateToProp(state) {
    return {
        locations: state.locationReducers.locations
    }
}

export default connect(mapStateToProp)(renderLocations)