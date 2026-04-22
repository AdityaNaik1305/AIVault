import React from 'react'
import {assets} from '../assets/assets'
import { Outlet,useNavigate } from 'react-router-dom'
import { Menu,X } from 'lucide-react'
import { SignIn,useUser } from '@clerk/clerk-react'
import Sidebar from '../components/Sidebar'

const Layout = () => {


  const navigate = useNavigate()
  const [sidebar,setSidebar] = React.useState(false)
  const {user} = useUser();
  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      
    <nav>
      <img src={assets.logo2} alt="Logo" className='cursor-pointer w-60 sm:w-44 content-center' onClick={() => navigate('/')} />
      {
        sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=> setSidebar(false)} />
        : <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={()=> setSidebar(true)} />
      }
    </nav>
    <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
      <Sidebar sidebar={sidebar} setSiderbar={setSidebar} />
      <div className='flex-1 bg-[#F4F7FB]'>
        <Outlet />
      </div>
    </div>
    </div>
    
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout
