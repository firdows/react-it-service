import React from 'react';
//renderField จะรบ props ตำงๆ ของ Field ทไดจำก redux-form
const renderField = ({
    input,
    label,
    type,
    textarea,
    autoFocus,
    meta: {
        touched,
        error
    }
}) => {
    //สำหรบรปแบบ Field ทเปน TextArea
    const textareaType = <textarea {...input} placeholder={label} className="form-control" row="3"/>;
    //สำหรบรปแบบ Field ทเปน TextBox
    const inputType = <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
        autoFocus={autoFocus}/>;
    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label">{label}</label>
            <div className="col-sm-9">
                {/* ตรวจสอบกอนวำ มกำรสง textarea หรอเปลำ*/}
                {textarea
                    ? textareaType
                    : inputType}
                {/* สวนนจะแสดงขอควำม error ทไดจำกกำร validate */}
                {touched && error && <small className="text-danger">{error}</small>}
            </div>
        </div>
    )
}
export default renderField;