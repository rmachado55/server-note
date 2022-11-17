import express from "express";
import NoteController from "../controllers/notesController.js"
import WithAuth from '../middlewares/auth.js';

const router = express.Router();

router
    .get('/notes/search', WithAuth, NoteController.searchNote)
    
    .get('/notes/view', WithAuth, NoteController.viewAllNotes)
  
    .post('/notes/create', WithAuth, NoteController.createNote)

    .delete('/notes/delete/:id', WithAuth, NoteController.deleteNote)

    .put('/notes/edit/:id', WithAuth, NoteController.editNote)

    .get('/notes/view/:id', WithAuth, NoteController.viewNote)
   



export default router;