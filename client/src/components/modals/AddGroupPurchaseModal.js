import React, { useEffect, useState } from 'react'
import API from '../../services/API';
import { useParams } from 'react-router-dom';

const AddGroupPurchaseModal = () => {
    const [itemName,setItemName] = useState("");
    const [purchaserEmail,setPurchaserEmail] = useState("");
    const [memberDetails, setMemberDetails] = useState({}); 
    const [data, setData] = useState([]);
    const [cost,setCost] = useState("");
    const {groupId}=useParams();
    const handleModalSubmit=async ()=>{
        try {
            const {data} = await API.post("/group/purchase",{
                itemName,
                cost,
                groupId,
                email:purchaserEmail,
            });
            if(data?.success){
                alert(data?.message);
                window.location.reload();
            }
            
        } catch (error) {
            alert(error.response.data.message);
            console.log(error)
            window.location.reload();
        }
    }

    const findDetails = async (memberId) => {
        try {
            const response = await API.get(`/group/get-member-details/${memberId}`);
            if (response.data?.success) {
                setMemberDetails(prevDetails => ({
                    ...prevDetails,
                    [memberId]: response.data?.member
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const getGroupMembers = async () => {
        try {
            const response = await API.get(`/group/get-members/${groupId}`);
            if (response.data?.success) {
                setData(response.data?.members);
                response.data?.members.forEach(findDetails);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getGroupMembers();
    }, [groupId]);
  return (
        <div className="modal fade" id="staticBackdropPurchase" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Purchase Record</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        {/* <div className="form-floating mb-3">
                            <input type="email" name="purchaserEmail" value={purchaserEmail} onChange={(e) => { setPurchaserEmail(e.target.value) }} className="form-control text-dark" />
                            <label className='form-label text-dark' htmlFor="forPurchaserEmail">Purchaser Email</label>
                        </div> */}
                        <select  className="form-select  mb-3" aria-label="Default select example" name="purchaserEmail" onChange={(e) => { setPurchaserEmail(e.target.value) }}>
                            <option defaultValue={""}>Select the purchaser email</option>
                            {data?.map((record) => {
                                        const member = memberDetails[record];
                                        if (member) {
                                            return (
                                                <option key={record} value={member?.email}>{member?.email}</option>
                                            );
                                        } else {
                                            return (
                                                <option key={record} value="1">One</option>
                                            );
                                        }
                                    })}
                        </select>
                        <div className="form-floating mb-3">
                            <input type="text" name="itemName" value={itemName} onChange={(e) => { setItemName(e.target.value) }} className="form-control text-dark" />
                            <label className='form-label text-dark' htmlFor="forItemName">Item name</label>
                        </div> 
                        <div className="form-floating mb-3">
                            <input type="number" name="cost" value={cost} onChange={(e) => { setCost(e.target.value) }} className="form-control text-dark" />
                            <label className='form-label text-dark' htmlFor="forCost">Item cost</label>
                        </div>    
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleModalSubmit} >Add</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AddGroupPurchaseModal
