import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
const Layout = ({children}) => {
  return (
    <>
        <div >
            <Header/>
        </div>  
        <div >
          <div className='row mh-100 g-0'>
            <div className='col-md-3 row-md-12'>
                <Sidebar/>
            </div>
            <div className="col-md-9">{children}</div>
          </div>
        </div>
    </>
    
  )
}

export default Layout
