import notes from '../models/Note.js'


class NoteController{

    static createNote = async(req, res) =>{
        const { title, body } = req.body;        

        try {
            let note = new notes({ title: title, body: body, author:req.user._id});
            await note.save();
            res.status(200).json(note);
        } catch (error) {
            res.status(500).json({error: 'Problem creating a new Note'});
        }
    }

    static viewNote = async(req,res) => {
      try{
        const { id } = req.params;
        let note = await notes.findById(id);
            if(isOwner(req.user, note))
                res.json(note);
            else
                res.status(403).json({error: 'Permission Dennied'})

      } catch (error) { 
        res.status(500).json({error: 'Failed to load the note'})
      } 
    }

    static viewAllNotes = async(req,res) => {
        try{
            let allNotes = await notes.find({author: req.user._id});
            res.json(allNotes);
        } catch (error) {
            res.json({error: error}).status(500);
        }
    }

    static editNote = async(req, res) => {
        const { title, body } = req.body;
        const { id } = req.params;

        try {
            let note = await notes.findById(id);
            if(isOwner(req.user, note)){
                let note = await notes.findOneAndUpdate(id,
                    { $set : { title : title, body : body} },
                    { upsert: true, 'new' : true }
                );
                
                res.json(note);
            } else
                res.status(403).json({error: 'Permission Dennied'});
            
            } catch (error) {
                res.status(500).json({error: 'Failed to update the Note'});
            }
        }
    }

const isOwner = (user, note) => {
    if(JSON.stringify(user._id) == JSON.stringify(note.author._id))
        return true;
    else    
        return false;
}

export default NoteController