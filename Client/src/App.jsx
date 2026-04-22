import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import WriteArticle from './pages/WriteArticle'
import BlogTitles from './pages/BlogTitles'
import SocialMediaGenerator from './pages/SocialMediaGenerator'
import ReviewResume from './pages/ReviewResume'
import Success from "./pages/Success";

//import { useAuth } from '@clerk/clerk-react'
import {Toaster} from "react-hot-toast"

function App() {
  

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='social-media' element={<SocialMediaGenerator />} />
          <Route path='review-resume' element={<ReviewResume />} />
        </Route>
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  )
}

export default App