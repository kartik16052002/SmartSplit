import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AddGroupMemberModal from '../components/modals/AddGroupMemberModal';
import { useParams } from 'react-router-dom';
import API from '../services/API';
import AddGroupPurchaseModal from '../components/modals/AddGroupPurchaseModal';
import { useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAttachMoney } from "react-icons/md";
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [groupDetails, setGroupDetails] = useState("");
    const [data, setData] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [purchaser, setPurchaser] = useState([]);
    const [memberDetails, setMemberDetails] = useState({});
    const { groupId } = useParams();

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

    const findPurchaser = async (purchase) => {
        try {
            const { data } = await API.get(`/group/get-member-details/${purchase.payer}`);
            if (data?.success) {
                setPurchaser(prevDetails => ({
                    ...prevDetails,
                    [purchase.payer]: data?.member
                }));
                // console.log("findPurchaser", purchaser)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPurchases = async () => {
        try {
            const { data } = await API.get(`/group/get-purchases/${groupId}`);
            if (data?.success) {
                setPurchases(data?.purchases);
                // console.log("getpurchasesd",data)
                data?.purchases.forEach(findPurchaser);
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getGroup = async () => {
        try {
            // console.log(groupId);
            const { data } = await API.get(`/group/get-group-details/${groupId}`);
            if (data?.success) {
                // console.log("findDetails",data)
                setGroupDetails(data?.group);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGroupMembers();
        getPurchases();
        getGroup();
    }, [groupId]);

    const handleSplit = async () => {
        try {
            const { data } = await API.post("/group/settleBill", {
                groupId,
            })
            console.log("settleBill", data);
            if (data?.success) {
                alert("Bill split successfully");
                window.location.reload();
            }

        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteGroup = async () => {
        try {
            const { data } = await API.delete(`/group/delete-group/${groupId}`);
            // console.log("deleteGroup",data);
            if (data?.success) {
                alert("Group deleted successfully");
                window.location.href = "/";
            }

        } catch (error) {

        }
    }


    return (
        <Layout>
            <div className='d-flex flex-column justify-content-between h-100'>
                <div className='container'>
                    <div className='row mh-100 g-0'>
                        <div className='p-4 col-md-6 '>
                            <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: 'pointer' }}>
                                <i className='fa-solid fa-plus text-success py-4'></i>
                                Add Member
                            </h4>
                            <h3 className='text-center'>Group Members</h3>
                            <table className="table member-table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map((record) => {
                                        const member = memberDetails[record];
                                        if (member) {
                                            return (
                                                <tr key={record}>
                                                    <td>{member.name}</td>
                                                    <td>{member.email}</td>
                                                </tr>
                                            );
                                        } else {
                                            return (
                                                <tr key={record}>
                                                    <td colSpan="2">Loading...</td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                            <AddGroupMemberModal />
                        </div>
                        <div className="p-4 col-md-6 bg-red">
                            <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#staticBackdropPurchase" style={{ cursor: 'pointer' }}>
                                <i className='fa-solid fa-plus text-success py-4'></i>
                                Add Purchase
                            </h4>
                            <h3 className='text-center'>Group Purchases</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Payer Name</th>
                                        <th scope="col">Item Bought</th>
                                        <th scope="col">Cost</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {purchases?.map((purchase) => {
                                        const member = purchaser[purchase.payer];
                                        if (member) {
                                            return (
                                                <tr key={purchase.itemName}>
                                                    <td>{member.name}</td>
                                                    <td>{purchase.itemName}</td>
                                                    <td>{purchase.cost}</td>
                                                </tr>
                                            );
                                        } else {
                                            return (
                                                <tr key={purchase.itemName}>
                                                    <td colSpan="2">Loading...</td>
                                                </tr>
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                            <AddGroupPurchaseModal />
                        </div>
                    </div>


                </div>
                <div className="row p-4 col-md-12 mt-3 d-flex">
                    {user?._id === groupDetails?.createrId && !groupDetails?.settlementCompleted && (
                        <div className='d-flex justify-content-center'>
                            <button type="button" className="d-flex align-items-center btn w-20 btn-success" onClick={handleSplit}><MdAttachMoney size={19} /> Split</button>

                        </div>

                    )
                    }
                    {user?._id === groupDetails?.createrId && (
                        <div className='d-flex justify-content-end'>
                            <button type="button" className="d-flex align-items-center btn mw-50 btn-danger" onClick={handleDeleteGroup}><RiDeleteBin6Line size={18} />Delete group</button>
                        </div>
                    )
                    }

                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
