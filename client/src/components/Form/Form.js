import React, { useState } from 'react'
import Input from './Input';
import { Link } from 'react-router-dom'
import { handleLogin, handleRegister } from '../../services/authServices';

const Form = ({ formHeading, btnName, formType }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [upiId, setUpiId] = useState("");
  const [method, setMethod] = useState("email");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className='formContainer'>
      <form className='d-flex flex-column justify-content-between' onSubmit={(e) => {
        if (formType === 'register') return handleRegister( e, email, name, phone, password, upiId, confirmPassword );
        else if(formType==='login') return handleLogin(e,email, phone, password, method );
      }}>
        <h3>{formHeading}</h3>
        {(() => {
          switch (true) {
            case formType === "register": {
              return (
                <div>
                  <Input inputType="text" labelFor="forName" name="name" labelText="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                  <Input inputType="email" labelFor="forEmail" name="email" labelText="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                  <Input inputType="number" labelFor="forPhone" name="phone" labelText="Phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                  <Input inputType="text" labelFor="forUpiId" name="upiId" labelText="Upi Id" value={upiId} onChange={(e) => { setUpiId(e.target.value) }} />
                  <Input inputType="password" labelFor="forPassword" name="passsword" labelText="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  <Input inputType="password" labelFor="forConfirmPassword" name="confirmPassword" labelText="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                </div   >
              )
            }
            case formType === "login": {
              return (
                <div>
                  <div>
                    <div className='d-flex radio-container justify-content-around'>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="method" id="emailRadio" value="email" onChange={(e) => { setMethod(e.target.value) }} defaultChecked />
                        <label className="form-check-label" htmlFor="inlineRadio2">Email</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="method" id="phoneRadio" value="phone" onChange={(e) => { setMethod(e.target.value) }} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Phone</label>
                      </div>
                    </div>

                  </div>
                  <div>
                    {(method == "email" &&
                      <Input inputType="email" labelFor="forEmail" name="email" labelText="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />) ||
                      <Input inputType="number" labelFor="forPhone" name="phone" labelText="Phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    }
                    <Input inputType="password" labelFor="forPassword" name="password" labelText="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                  </div>
                </div>
              )
            }
            default:
              break;
          }
        })()}
        <div className='d-flex flex-row form-bottom justify-content-between'>
          {formType === 'login' ? (
            <p>Not Registered Yet? Register&nbsp;
              <Link to="/register">Here</Link>
            </p>
          ) : (
            <p>Already a User!&nbsp;
              <Link to="/login">Login</Link>
            </p>)}
          <button className='btn mw-25 btn-primary' type='submit'>
            {btnName}
          </button>
        </div>

      </form>
    </div>
  )
}

export default Form
