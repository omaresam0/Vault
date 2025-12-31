import express from "express"
const router = express.Router();
import * as NoteController from "../controllers/notesController.js"; 

router.get("/", NoteController.getAllNotes);

router.get("/:id", NoteController.getNoteById);

router.post("/", NoteController.createNote);

router.put("/:id", NoteController.updateNote);

router.delete("/:id", NoteController.deleteNote);

export default router;
