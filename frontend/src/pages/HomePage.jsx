import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import toast from "react-hot-toast"
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import { SearchIcon } from 'lucide-react'  

const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);  
  const [filteredNotes, setFilteredNotes] = useState([]);  
  const [searchQuery, setSearchQuery] = useState('');      
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async() => {
      try{
        const res = await api.get("/notes");
        setNotes(res.data);
        setFilteredNotes(res.data);  
        setRateLimited(false)
      } catch(error){
        console.log("Error fetching notes");
        if(error.response.status === 429){
          setRateLimited(true);
        } else{
          toast.error("Failed to load notes");
        }
      } finally{
        setLoading(false)
      }
    };
    fetchNotes(); 
  }, []);

  // NEW: Filter notes when search changes
  useEffect(() => {
    const filtered = notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchQuery, notes]);

  return <div className='min-h-screen'>
    <Navbar/>
    { isRateLimited && <RateLimitedUI/> }

    <div className='max-w-7xl mx-auto p-4 mt-6'>
      {/* NEW: Search Bar (Guaranteed working) */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base-content/50" />
        <input
          type="text"
          placeholder="Search notes..."
          className="input input-bordered pl-10 w-full pr-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-xs"
            onClick={() => setSearchQuery('')}
          >
            <svg className="w-4 h-4">✕</svg>
          </button>
        )}
      </div>

    {searchQuery && (
     <label className="label mb-6 block">
       <span className="label-text">
       {filteredNotes.length} of {notes.length} notes
       </span>
     </label>
   )}

      { loading && <div className='text-center text-primary py-10'>Loading notes..</div>}
      {filteredNotes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredNotes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
      {searchQuery && filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-base-content/60 mb-4">No notes found</p>
          <p className="text-sm text-base-content/40">Try a different search</p>
        </div>
      )}
    </div>
  </div>
}

export default HomePage
