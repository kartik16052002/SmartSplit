import React, { useEffect, useState } from 'react'
import API from '../services/API'
import { useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const [data, setData] = useState([]);
  const [groupDetails,setGroupDetails]= useState({});
  const location = useLocation();
  const findDetails = async (groupId)=>{
    try {
      // console.log(groupId);
      const {data} = await API.get(`/group/get-group-details/${groupId}`);
      if(data?.success){
        // console.log("findDetails",data)
        setGroupDetails(prevDetails=>({
          ...prevDetails,
          [groupId]:data?.group
        }))
      }
      
    } catch (error) {
      console.log(error);
    }
  }


  const getGroup = async () => {
    try {
      const  {data}  = await API.get("/group/get-groups");
      if (data?.success) {
        setData(data?.groups);
        data?.groups.map(findDetails)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGroup();
  }, [])


  
  return (
    <div className='sidebar'>
      <h3 className='text-center'>Your Groups</h3>
      <div className='menu m-0 p-2 d-flex pt-40 '>
        <ul className="list-group list-group-flush w-100 ">
          {data?.map((record)=>{
            return (
              <li key={record} className={`list-group-item list-item ${location.pathname === `/group/${record}` && 'active'}`}>
                <Link to={`/group/${record}`} className={`link-no-style`}>
                  {groupDetails[record]?.groupName?.toUpperCase()}
                </Link>
              </li>
            )
          })
          }
        </ul>

      </div>
    </div>
  )
}

export default Sidebar
