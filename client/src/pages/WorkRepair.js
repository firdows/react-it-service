import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { loadWorks } from '../redux/actions/workActions'
import WorkTableRepair from '../components/Work/WorkTableRepair'

class WorkRepair extends Component {

    componentWillMount() {
        this.props.dispatch(loadWorks(0));
    }



    render() {
        const { works } = this.props;
        const { data } = works;

        if (works.isRejected) {
            //ถำม error
            return <div>{works.data}</div>
        }

        // if(works.isLoading){
        //     return <div></div>:'' }
        // }
        return (
            <div>
                <h3>งานซ่อม</h3>


                {works.isLoading && <div>Loading...</div>}

                <WorkTableRepair data={data} btnRepair={this.handleRepair}/>
            </div>
        )
    }

    handleRepair = (id) => {
        browserHistory.push(`/work/repair/${id}`)
    }
}

function mapStateToProp(state) {
    return {
        works: state.workReducers.works
    }
}

export default connect(mapStateToProp)(WorkRepair)