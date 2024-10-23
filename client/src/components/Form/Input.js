import React from 'react'

const Input = ({inputType,labelFor,name,labelText,value,onChange}) => {
    return (
        <div className="form-floating mb-3">
            <input  type={inputType} name={name} value={value} onChange={onChange} className="form-control" />
            <label className='form-label' htmlFor={labelFor}>{labelText}</label>
        </div>

    )
}

export default Input;
