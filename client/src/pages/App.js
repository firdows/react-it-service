import React, {Component} from 'react';
import Header from '../themes/Header';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div className="container-fluid">
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
