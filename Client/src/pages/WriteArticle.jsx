import { Edit, Sparkles } from 'lucide-react'
import React from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articleLength=[
    {length:800,label:'Short (500-800 words)'},
    {length:1200,label:'Medium (800-1200 words)'},
    {length:1600,label:'Long (1200+ words)'},
  ]


  const [selectedLength, setSelectedLength] = React.useState(articleLength[0])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [content, setContent] = React.useState('')

  const {getToken} = useAuth()
  //const token = await getToken({ template: "default" });

  const onsubmitHandler = async(e) => {
    e.preventDefault()
    //call api to generate article
    try{
      setLoading(true)
      const prompt = `Write an Article about ${input} in ${selectedLength.length} words`
      const token = await getToken({ template: "default" });
      if (!token) {
      toast.error("Login required");
      return;
      }

      const { data } = await axios.post(
  '/api/ai/generate-article',
  {
    prompt,
    length: selectedLength.length, // ✅ send in body
  },
  {
    headers: {
      Authorization: `Bearer ${token}` // ✅ send token in headers,
    },
  }
);
      if(data.success){
        setContent(data.content)
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
          <Sparkles className='w-5 text-[#3588F2]' />
          <h1 className='text-lg font-medium'>Write an Article</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article topic</p>
        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='e.g. The future of AI' className='w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3588F2]' required/>
        <p className='mt-4 text-sm font-medium py-3'>Article Length</p>

      <div>
        {articleLength.map((item,index) => (
          <span onClick={()=>setSelectedLength(item)} 
         className={`text-xs px-4 py-2 border rounded-full cursor-pointer ${selectedLength.length === item.length ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'} `} key={index}>{item.label}</span>))}
      </div>
      <br></br>
      <br></br>
      <button disabled={loading} className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        {
          loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
          : <Edit className='w-5' />
        }
        Generate Article
      </button>
      </form>

      {/* right column */}
      <div className='w-full max-w-lvh p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Edit className='w-5 text-[#3588F2]' />
          <h1 className='text-xl font-semibold'>Generate Article</h1>
        </div>

       {!content ? (
      <div className='flex-1 flex justify-center items-center'>
        <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
          <Edit className='w-20 h-10 text-gray-300' />
          <p>Your generated article will appear here</p>
        </div>
      </div>
       ) : (
        <div className='mt-3 h-full overflow-y-scroll text-slate-600'>
          <div className='.reset-tw'><Markdown>{content}</Markdown></div>
        </div>
       )}

      </div>
    </div>
  )
}

export default WriteArticle
