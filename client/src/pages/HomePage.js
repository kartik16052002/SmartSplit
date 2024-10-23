import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AddGroupModal from '../components/modals/AddGroupModal';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import API from '../services/API';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [memberDetails, setMemberDetails] = useState({});

  const findDetails = async (transaction) => {
    try {
      const response = await API.get(`/group/get-member-details/${transaction.payee}`);
      if (response.data?.success) {
        setMemberDetails((prevDetails) => ({
          ...prevDetails,
          [transaction.payee]: response.data?.member,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    if (!user?._id) {
      console.error('User ID is not available');
      return;
    }

    try {
      const { data } = await API.get(`/group/get-transactions/${user._id}`);
      if (data?.success) {
        setData(data.transactions);
        data.transactions.forEach(findDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getTransactions();
    }
  }, [user]);


  const copyToClipboard = (upiId) => {
    navigator.clipboard.writeText(upiId)
      .then(() => {
        alert('UPI ID copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };
  
  return (
    <Layout>
      <div>
        <div className="container">
          <h4 className="ms-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: 'pointer' }}>
            <i className="fa-solid fa-plus text-success py-4"></i>
            Add Group
          </h4>
          <h3 className="text-center">Remaining Payments</h3>
          <div className='container row'>
          <table className="table home-table">
            <thead>
              <tr>
                <th scope="col">Payer Name</th>
                <th scope="col"></th>
                <th scope="col">Payee</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record) => (
                <tr key={record.payee}>
                  <td >{user.name.toUpperCase()}</td>
                  <td className='w-30'><FaLongArrowAltRight size='30'/></td>
                  <td>{memberDetails[record.payee]?.name.toUpperCase()} 
                  <img 
                      className="clipboard-img"  
                      title="UPI Id" 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfdGtFCj2-QKWDM-qTPI2VUqlvfsbvWB-nKw&s" 
                      alt="" 
                      onClick={() => copyToClipboard(memberDetails[record.payee]?.upiId)} 
                      style={{ cursor: 'pointer' }}
                    />
                    </td>
                  <td>{record?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <AddGroupModal />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
