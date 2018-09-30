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
        let menu_items = [];

        if (this.props.authentication) {
            if (this.props.data.user_type === 1) {
                menu_items = [
                    { title: 'แจ้งซ่อม', link: "/work" },
                    { title: 'งานซ่อม', link: "/work/repair" },
                    { title: 'สถานที่', link: "/location" },
                    { title: 'ผู้ใช้', link: "/user" },
                ]
            } else {
                menu_items = [
                    { title: 'แจ้งซ่อม', link: "/work" },
                    { title: 'งานซ่อม', link: "/work-repair" },
                ]
            }
            var i = 0;
            return (
                (menu_items && menu_items.map(item => {
                    return <li className="nav-item" key={++i} >
                        <Link to={item.link} className="nav-link">{item.title}</Link>
                    </li>
                }))
            )
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
            <nav className="navbar navbar-expand-md navbar-dark bg-info">

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
