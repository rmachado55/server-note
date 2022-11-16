import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: String,
        body: String,        
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        created_at: {type: Date, default: Date.now},
        updated_at: {type: Date, default: Date.now}
    })


const notes = mongoose.model('notes', noteSchema)

export default notes;
