import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../../services/API';

const AddGroupMemberModal = () => {
const [name,setName] =useState("");
const [email,setEmail] =useState("");
const {groupId}=useParams();
const handleModelSubmit=async()=>{
    try {
        if(!name || !email){
            return alert("Please enter the full information");
        }
        // console.log(groupId);
        const {data} = await API.post("/group/add-member",{
            name,
            email,
            groupId,
        })
        console.log(data);
        if(data?.success){
            alert("New Record Created");
            window.location.reload();
        }
        
    } catch (error) {
        alert(error.response.data.message);
        console.log(error)
        window.location.reload();
    }
}
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Member</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" name="name" value={name} onChange={(e) => { setName(e.target.value) }} className="form-control text-dark" />
                            <label className='form-label text-dark' htmlFor="forName">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" name="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control text-dark" />
                            <label className='form-label text-dark' htmlFor="forEmail">Email</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleModelSubmit} >Add</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddGroupMemberModal
