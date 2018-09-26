import React, { Component } from 'react'
import { connect } from 'react-redux'
///--
import {
    loadWorks
} from '../redux/actions/workActions'
import WorkTable from '../components/Work/WorkTable'


class Work extends Component {

    componentDidMount() {
        this.props.dispatch(loadWorks())
    }


    render() {
        const { works } = this.props;

        return (
            <div>
                <h3>Work</h3>

                {/* แสดงขอควำม Loading กอน */}
                {works.isLoading && <div>Loading...</div>}
                {/* Component UserTable จะสง props ไป 4 ตว */}
                <WorkTable
                    data={works.data}
                    // buttonNew={this.handleNew}
                    // buttonEdit={this.handleEdit}
                    // buttonDelete={this.handleDelete}
                    // buttonView={this.handleView}
                />


            </div>
        )
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
