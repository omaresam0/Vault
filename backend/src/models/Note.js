import mongoose from "mongoose";

const noteSchema  = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
  
},
{ timestamps: true } // createdAt, updatedAt
);

const Note = mongoose.model("Note", noteSchema) // creating node model based on this schema with model named "Note" and collection named Notes

export default Note;