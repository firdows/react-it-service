import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWork } from '../../redux/actions/workActions';
import { Table } from 'reactstrap'

class WorkView extends Component {
    componentDidMount() {
        var workId = this.props.params.id
        this.props.dispatch(getWork(workId))
    }



    render() {
        const { work } = this.props
        const { data } = work

        if (work.isRejected)
            return <div>{work.data}</div>

        if (work.isLoading)
            return (<div>Loading....</div>)


        return (
            <div>
                <h3>{data.detail}</h3>
                <Table>
                    <tr>
                        <th>วันที่แจ้ง</th>
                        <td>{data.doc_date}</td>
                    </tr>

                </Table>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        work: state.workReducers.work,
    }

}

export default connect(mapStateToProps)(WorkView)