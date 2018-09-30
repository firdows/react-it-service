import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from '../themes/Header';
import Left from '../themes/Left';

class App extends Component {


    render() {
        
        if (this.props.authentication) {
            return (
                <div className="App">                    
                    <Header />
                    <div className="container-fluid">
                        <div className="content">
                            <div className="row">
                                <div className="col-sm-3">
                                    <Left />
                                </div>
                                <div className="col-sm-9">
                                    {this.props.children}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <Header />
                    <div className="container-fluid">
                        <div className="content">
                            {this.props.children}

                        </div>
                    </div>
                </div>
            );
        }
    }
}

//export default App;
function mapStateToProps(state) {
    return {
        authentication: state.authReducers.authenticated,
        data: state.authReducers.data
    }
}
export default connect(mapStateToProps)(App)
