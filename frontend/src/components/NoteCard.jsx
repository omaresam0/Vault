import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import {Link} from 'react-router'
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {

const handleDelete = async(e, id) => {
  e.preventDefault(); // prevent navigating to details page
  if(!window.confirm("Are you sure you want to delete this note?"))
    return;
  try{
    await api.delete(`/notes/${id}`);
    toast.success('Note deleted successfully');
    // take prev note state (contains all notes on homepage), filters with the matching note id then create new array with the other notes (not to be deleted) then replace the entire notes state (prev) with that array (excluded the deleted one)
    setNotes((prev) => prev.filter(note => note._id !== id)); // remove the deleted note from ui
  }catch(error){
    console.log('Failed deleting', error);
    toast.error('Failed to delete the note');
  }
}

  return (
  <Link to={`/note/${note._id}`}
  className="card w-80 bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#6e8ce6]">
    <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
            <span className='text-sm text-base-content/60'>{note.createdAt}</span>
            <div className='flex items-center gap-1'>
                <PenSquareIcon className='size-4'/>
                <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                    <Trash2Icon className='size-4'/>
                </button>
            </div>
        </div>
    </div>
  </Link>
  )
}

export default NoteCard
