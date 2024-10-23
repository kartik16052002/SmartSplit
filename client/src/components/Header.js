import React, { useEffect } from 'react'
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
    const {user} =useSelector(state=>state.auth);
    // console.log(user)
    const navigate =useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        alert("Logout Successfull!")
        navigate("/login");
    }
    return (
        <nav className="navbar ">
            <div className="container-fluid ">
                <div className='navbar-brand d-flex align-items-center'>
                    <FaMoneyBillTransfer /> BillSpilt
                </div>
                <ul className='navbar-nav d-flex  flex-row  align-items-center'>
                    <li className='nav-item me-2'>
                        <p className='nav-link d-flex m-0 flex-row  align-items-center'>
                        <Link to={`/`} className={`link-no-style d-flex align-items-center`}>
                            <IoMdHome /> HOME &nbsp;
                        </Link>
                           
                        </p>
                    </li>
                    <li className='nav-item '>
                        <p className='nav-link d-flex m-0 flex-row  align-items-center'>
                            <BiUserCircle/> Welcome , {user?.name.toUpperCase()}&nbsp;
                        </p>
                    </li>
                    <li className='nav-item mx-3 '>
                        <button className='btn btn-danger' onClick={handleLogout}>
                            Logout
                        </button>
                </li>
                </ul>
                
            </div>
        </nav>
    )
}

export default Header