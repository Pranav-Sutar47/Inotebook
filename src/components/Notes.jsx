import NoteContext from "../context/Notes/NoteContext";
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from "./NoteItem";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
    const context = useContext(NoteContext);
    const { notes, getNotes ,editNotes} = context;
    const [show, setShow] = useState(false);
    const [note,setNote] = useState({id:"",etitle:"",etag:"",edescription:""});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const change = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
      }
    
      const validate = (e)=>{
        e.preventDefault();
        editNotes(note.id,note.etitle,note.etag,note.edescription);
        refClose.current.click();
        clearForm();
      }
    
      const clearForm = () =>{
        setNote({
            id:"",
          etitle:"", 
          etag:"",
          edescription:""
        })
      }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            navigate('/login');
        }
        
        // eslint-disable-next-line
    }, []);
    
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (note) => {
        ref.current.click();
        //console.log(note._id);
        setNote({id:note._id,etitle:note.title,etag:note.tag,edescription:note.description});
    }

    return (
        <>
            <Button variant="primary" style={{ display: 'none' }} ref={ref} onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton className={`bg-${props.toggle} text-${props.toggle === 'light' ? 'black' : 'white'}`}>
                    <Modal.Title>Edit Note</Modal.Title>
                </Modal.Header>
                <Modal.Body className={`bg-${props.toggle} text-${props.toggle === 'light' ? 'black' : 'white'}`}>
                    <Form className={`bg-${props.toggle} text-${props.toggle === 'light' ? 'dark' : 'light'} mt-0`}>
                        <Form.Group className="mb-2" controlId="noteTitle">
                            <Form.Control type="text" placeholder="Enter Title" name='etitle' onChange={change} value={note.etitle} minLength={5} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="noteTag">
                            <Form.Control type="text" placeholder="Tag" name='etag' onChange={change} value={note.etag} />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="noteDescription">
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                name='edescription'
                                onChange={change}
                                minLength={5}
                                value={note.edescription}
                                style={{ height: '100px' }}
                            />
                        </Form.Group>
                        <Button type="button" variant='outline-success' className='mb-2' onClick={validate} disabled={note.etitle.length<5 || note.edescription.length<5}>
                            Update Note
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer className={`bg-${props.toggle} text-${props.toggle === 'light' ? 'black' : 'white'}`}>
                    <Button variant="secondary" ref={refClose} onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="row mt-2 mx">
                <div className="container fs-1 fw-bold">{notes.length===0 && 'No notes'}</div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} toggle={props.toggle} togglemode={props.togglemode}
                            updateNote={updateNote} ref={ref} handleClose={props.handleClose} handleShow={props.handleShow} show={props.show} />
                    })
                }
            </div>
        </>
    )
}

export default Notes;