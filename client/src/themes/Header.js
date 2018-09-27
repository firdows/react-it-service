import React, { Component } from 'react'
import { Link } from 'react-router';
import { Collapse, NavbarToggler, NavbarBrand } from 'reactstrap'
import { connect } from 'react-redux'

class Header extends Component {

    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    renderLinks() {
        if (this.props.authentication) {
            if (this.props.data.user_type === 0) {
                return [
                    <li className="nav-item" key={2} >
                        <Link to="/work" className="nav-link">แจ้งซ่อม</Link>
                    </li>,
                ]
            } else if (this.props.data.user_type === 1) {
                return [
                    <li className="nav-item" key={2} >
                        <Link to="/work" className="nav-link">แจ้งซ่อม</Link>
                    </li>,
                    <li className="nav-item" key={3} >
                        <Link to="/location" className="nav-link">สถานที่</Link>
                    </li>,
                    <li className="nav-item" key={4} >
                        <Link to="/user" className="nav-link">ผู้ใช้</Link>
                    </li>,
                ]
            } else {
                return [
                    <li className="nav-item" key={2} >
                        <Link to="/work" className="nav-link">แจ้งซ่อม</Link>
                    </li>,
                    <li className="nav-item" key={3} >
                        <Link to="/location" className="nav-link">สถานที่</Link>
                    </li>,
                    <li className="nav-item" key={4} >
                        <Link to="/user" className="nav-link">ผู้ใช้</Link>
                    </li>,
                ]
            }
        }
    }

    renderLinksRight() {

        if (this.props.authentication) {

            return [
                <li className="nav-item" key={1} >
                    <Link to="/signout" className="nav-link">ออกจากระบบ</Link>
                </li>,
            ]
        } else {
            return [
                <li className="nav-item" key={1} >
                    <Link to="/signin" className="nav-link">เข้าสู่ระบบ</Link>
                </li>,
            ]
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-warning">
                <NavbarBrand href="/" >IT Service</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <div className="navbar-nav-scroll">
                        <ul className="navbar-nav">
                            {this.renderLinks()}
                        </ul>
                    </div>
                    <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                        {this.renderLinksRight()}
                    </ul>
                </Collapse>
            </nav>
        )
    }
}

//authentication เชควำเปน true หรอ false
//data ตวนจะไดขอมล PAYLOAD จำก token ครบ
//ทงหมดทงมวลเรำจดกำรมำตงแต action, reducer แลวครบ
function mapStateToProps(state) {
    return {
        authentication: state.authReducers.authenticated,
        data: state.authReducers.data
    }
}
export default connect(mapStateToProps)(Header)
