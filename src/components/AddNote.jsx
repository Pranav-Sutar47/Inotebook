import React, { useContext, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import NoteContext from '../context/Notes/NoteContext';

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const {addNote} = context;
  const [note,setNote] = useState({title:"",tag:"",description:""});

  const change = (e)=>{
    setNote({...note, [e.target.name]:e.target.value})
  }

  const validate = (e)=>{
    e.preventDefault();
    addNote(note.title,note.tag,note.description);
    clearForm();
  }

  const clearForm = () =>{
    setNote({
      title:"", 
      tag:"",
      description:""
    })
  }

  return (
    <Form className={`bg-${props.toggle} text-${props.toggle==='light'?'dark':'light'} mt-0`}>
    <Form.Group className="mb-2" controlId="noteTitle">
      <Form.Control type="text" placeholder="Enter Title" name='title' onChange={change} value={note.title} minLength={5}/>
    </Form.Group>
    <Form.Group className="mb-2" controlId="noteTag">
      <Form.Control type="text" placeholder="Tag" name='tag' onChange={change} value={note.tag}/>
    </Form.Group>
    <Form.Group className="mb-2" controlId="noteDescription">
    <Form.Control
          as="textarea"
          placeholder="Description"
          name='description'
          minLength={5}
          onChange={change}
          value = {note.description}
          style={{ height: '100px' }}
        />
    </Form.Group>
    <Button type="button" variant='outline-success' className='mb-2' onClick={validate} disabled={note.title.length<5 || note.description.length<5}>
      Add Note
    </Button>
  </Form>
  )
}
