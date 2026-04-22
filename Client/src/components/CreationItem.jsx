import React from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({items}) => {


    const [expanded, setExpanded] = React.useState(false)
  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>{items.prompt}</h2>
                <p className='text-gray-500'>{items.type} - {new Date(items.created_at).toLocaleDateString()}</p>
            </div>
            <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>{items.type}</button>
        </div>
       {
        expanded && (
            <div>
                {items.type === 'image' ? (
                    <img src={items.content} alt={items.prompt} className='mt-4 rounded-lg' />
                ) : (
                    <p className='reset-tw mt-4'><Markdown>{items.content}</Markdown></p>
                )}
            </div>
        )
       }
    </div>
  )
}

export default CreationItem
