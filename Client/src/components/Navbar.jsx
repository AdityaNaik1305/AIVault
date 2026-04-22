import React from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

function Navbar() {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

  return (
      <div className='fixed z-5 w-full bg-white/80 backdrop-blur-2xl flex justify-between items-center py-1.5 px-4 sm:px20 xl:px-32'>
        <img src={assets.logo2} alt="logo" className='w-32 sm:w-32 cursor-pointer' onClick={()=>navigate('/')} />
        {user ? <UserButton /> :
        <button onClick={()=>openSignIn()} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started <ArrowRight className='w-5 h-4'/></button>}
      </div>
  )
}

export default Navbar
