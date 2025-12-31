//import {Route, Routes} from 'react-router'
import HomePage from './pages/HomePage'
import NoteCreatePage from './pages/NoteCreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
//import toast from 'react-hot-toast'
// App.jsx
// App.jsx
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <div className='relative h-full w-full' data-theme="luxury">
      <div className='absolute inset-0 -z-10 h-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'/>
    <Routes>
        <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<NoteCreatePage/>} />
        <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>
    </div>
  )
}

export default App
