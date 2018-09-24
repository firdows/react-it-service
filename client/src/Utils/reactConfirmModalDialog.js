import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Modal, ModalHeader, Button, ModalBody, ModalFooter } from 'reactstrap';

//รปแบบกำรเขยนตอไปนจะเขำใจยำกครบตองใชเวลำนำนเพอทำและทดสอบ
//มนเปนรปแบบของกำรสรำง Element ขนมำใหม
export default class ReactConfirmModalDialog extends Component {
    //เกบ State เพอกำหนดวำจะใหแสดง Modal หรอไม
    state = {
        modal: this.props.show
    }
    //ใชงำน PropTypes เปนกำรเชคคำ Props ทสงเขำมำวำตรงตำมทเรำกำหนดหรอไม
    //เหมอนกำรตรวจสอบกำรทำงำนของโปรแกรมเพอไมใหเกดขอผดพลำด
    static propTypes = {
        type: PropTypes.string, //รบคำตวขอควำม warning, info
        show: PropTypes.bool,   //รบคำ true , false เพอกำหนดวำจะแสดง Modal หรอไม
        title: PropTypes.string,    //รบคำขอควำมเพอแสดงหวของ Modal
        message: PropTypes.string,  //ขอควำมทตองกำรใหปรำกฏใน Modal
        confirmLabel: PropTypes.string, //ขอควำมปมยนยน
        cancelLabel: PropTypes.string,  //ขอควำมปมยกเลอก
        onConfirm: PropTypes.func,  //เมอยนยนจะใหเรยกใช function อะไร
        onCancel: PropTypes.func,   //เมอยกเลอกจะใหเรยกใช function อะไร
        children: PropTypes.node,   //สำมำรถระบ element ยอยได ปกตจะไมไดใช
    };

    //กำหนด Default Props
    static defaultProps = {
        type: 'warning',
        show: false,
        title: '',
        message: '',
        childrenElement: () => null,
        confirmLabel: '',
        cancelLabel: 'ปด',
    };
    //ควบคมกำรแสดง Modal
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
        const target = document.getElementById('react-widget-dialog');
        if (target) {
            target.parentNode.removeChild(target);
        }
    }
    onClickConfirm = () => {
        this.props.onConfirm();
        this.toggle()
    };

    onClickCancel = () => {
        this.props.onCancel();
        this.toggle()
    };
    render() {
        const { title, message, confirmLabel, cancelLabel, type } = this.props;
        let buttonColor, modalColor;
        switch (type) {
            case 'info':
                buttonColor = "info";
                modalColor = "modal-info";
                break;
            default:
                buttonColor = "warning";
                modalColor = "modal-warning";
                break;
        }

        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={modalColor}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                        {message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>{cancelLabel}</Button>
                        {confirmLabel && <Button color={buttonColor} onClick={this.onClickConfirm}>
                            {confirmLabel}</Button>}
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
//ฟงกชนสรำง Element โดยจะวำดลงภำยใน Div
function createElementDialog(properties) {
    const divTarget = document.createElement('div');
    divTarget.id = 'react-widget-dialog';
    document.body.appendChild(divTarget);
    render(<ReactConfirmModalDialog {...properties} />, divTarget);
}
//สดทำยสงออกเปนชอ confirmModalDialog
export function confirmModalDialog(properties) {
    createElementDialog(properties);
}