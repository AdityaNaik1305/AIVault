import React from 'react'
import { AiToolsData } from '../assets/assets'
import { Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const AiTools = () => {
    const { user } = useUser()
    const Navigate = useNavigate()
  return (
    <div className='px-4 sm:py-20 xl:px-32 my-32'>
      <div className='text-center'>
        <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
        <p className='text-gray-500 max-w-lg mx-auto'>Discover the future of technology with our cutting-edge AI solutions.</p>
      </div>

         <div className='flex flex-wrap justify-center gap-8 mt-12'>
            {AiToolsData.map((tool, index) => (
                <div key={index} className='w-full sm:w-[45%] lg:w-[30%] bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl' 
                onClick={()=> user && Navigate(tool.path)}>
                <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl' 
                 style={{background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`}}/>
                 <h3 className='text-lg font-semibold mb-2'>{tool.title}</h3>
                 <p className='text-gray-500'>{tool.description}</p>
                </div>
            ))}

                    
         </div>
    </div>
  )
}

export default AiTools
