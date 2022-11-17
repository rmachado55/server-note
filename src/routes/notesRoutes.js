import express from "express";
import NoteController from "../controllers/notesController.js"
import WithAuth from '../middlewares/auth.js';

const router = express.Router();

router
    .post('/notes', WithAuth, NoteController.createNote)

    .get('/notes/:id', WithAuth, NoteController.viewNote)

    .get('/notes', WithAuth, NoteController.viewAllNotes)

    .put('/notes/:id', WithAuth, NoteController.editNote)

export default router;