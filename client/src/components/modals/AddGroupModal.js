import React, { useState } from 'react'
import Input from '../Form/Input'
import API from '../../services/API';
import { useSelector } from 'react-redux';
const AddGroupModal = () => {
    const {user} = useSelector(state=>state.auth);
    const [groupName, setGroupName] = useState("");

    const handleModalSubmit=async ()=>{
        try {
            if(!groupName){
                return alert("Please enter Group Name");
            }
            const {data} = await API.post("/group/create-group",{
                groupName,
                createrId: user?._id,
            })
            // console.log(data);
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
                        <h5 className="modal-title">Create Group</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <div className="form-floating mb-3">
                            <input type="text" name="groupName" value={groupName} onChange={(e) => { setGroupName(e.target.value) }} className="form-control text-dark" />
                            <label className='form-label text-dark' htmlFor="forGroupName">Group Name</label>
                        </div>    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleModalSubmit} >Create</button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AddGroupModal
