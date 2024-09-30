const express = require('express');
var fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');


// Routes 1 /api/notes/fetchallnotes
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    const notes = await Notes.find({user:req.user.id});
    res.json(notes);
})

// Routes 2 /api/notes/addnotes

router.post('/addnotes',fetchuser,[
    body('title','Enter valid title').isLength({min:3}),
    body('description','Description must be atleast of 5 character').isLength({min:5})
],async(req,res)=>{
    try{
        const {title,description,tag} = req.body;
        const err = validationResult(req);
        if(!err.isEmpty())
            res.status(401).send({error:'Validation problem'});
    
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
    
        const savenote = await note.save(); 
        res.send(savenote);
    }catch(error){
        console.log(error);
        res.status(500).send({error:'Internal server error'});
    }

})

//Route 3 /api/notes/updatenote to update the existing note

router.put('/updatenote/:id',fetchuser,async(req,res)=>{
    try{
        const {title,description,tag} = req.body;
        let newNote = {};
        if(title)
            newNote.title = title;
        if(description)
            newNote.description = description;
        if(tag)
            newNote.tag = tag;
    
        let note = await Notes.findById(req.params.id);
        if(!note)
            return res.status(404).send("Not found");
    
        if(note.user.toString()!==req.user.id)
            return res.status(401).send("Access Denied");
    
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
        res.send(note);
    }catch(error){
        console.log(error.message);
        res.status(501).send('Internal Server Error');
    }
  
})

//Route 4 Delete an existing note

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        let note = await Notes.findById(req.params.id);
        if(!note)
            return res.status(404).send('Not Found');
        if(note.user.toString()!==req.user.id)
            return res.status(401).send('Not allowed');
    
        note  = await Notes.findByIdAndDelete(req.params.id);
        res.send(note);
    }catch(error){
        console.log(error.message);
        res.status(501).send('Internal Server Error');
    }
   
})

module.exports = router;