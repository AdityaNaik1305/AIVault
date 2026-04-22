import { FileText, Sparkles } from 'lucide-react'
import React from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {

  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [content, setContent] = React.useState('')

    const {getToken} = useAuth()
    const onsubmitHandler = async(e) => {
        e.preventDefault()
        //call api to generate article
        try{
        setLoading(true)

        const formData = new FormData();
        formData.append('file', input);
    
        const token = await getToken({ template: "default" });
        if (!token) {
      toast.error("Login required");
      return;
      }

      const { data } = await axios.post(
  '/api/ai/resume-review',
    formData,// ✅ send in body
  {
    headers: {
      Authorization: `Bearer ${token}` // ✅ send token in headers,
    },
  }
);
      if(data.success){
        setContent(data.review)
      }
      else{
        toast.error(data.message)
      }
      }
      catch(error)
      {
        toast.error(error.message)
     }
     finally{
      setLoading(false)
      }
      }

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700 '>
      {/* left column */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-5 text-[#00DA83]' />
          <h1 className='text-lg font-medium'>AI Resume Reviewer</h1>
        </div>
        <br></br>
        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input onChange={(e)=>setInput(e.target.files[0])} type="file" accept="application/pdf" className='w-full mt-2 p-3 border border-gray-300 text-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3588F2]' required/>
        
        <p className='text-xs text-gray-500 font-light mt-1'>Support PDF Resume</p>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <FileText className='w-5 ' />}
      Review Resume
      </button>
      </form>

      {/* right column */}
      <div className='w-full max-w-lvh p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'>Analysis Results</h1>
        </div>

        { !content ?
        (
      <div className='flex-1 flex justify-center items-center'>
        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <FileText className='w-20 h-10 text-gray-300' />
          <p>Your analysis results will appear here</p>
        </div>
      </div>
        ) : 
        (
          <div className='mt-3 h-fulll overflow-y-scroll text-sm text-slate-600'>
            <div className='reset-tw'>
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )
        }

      
      </div>
    </div>
  )
}

export default ReviewResume
