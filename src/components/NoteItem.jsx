import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import NoteContext from '../context/Notes/NoteContext';
import { showToast } from './ToastComponent';

export default function NoteItem(props) {
    const {note ,updateNote} = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;

    const deletenote = () =>{
      deleteNote(note._id);
      showToast('Note is Deleted!!','info');
    }

    return (
        <Card className={`col-xl-4 col-md-4 col-sm-6 col-12 mt-2 mb-2
         bg-${props.toggle==='light'?'light':'dark'}`} style={{border:`${props.toggle==='dark'?'1px solid green':''}`}}>
        <Card.Body className='text-start'>
          <div className='d-flex'>
          <Card.Title className={`text-${props.toggle==='light'?'black':'light'} mr-3`}>{note.title}
          </Card.Title>
          <MdDelete className={`text-${props.toggle==='light'?'black':'light'} ms-auto cursor fs-3`} onClick={deletenote}/>
          <CiEdit className={`text-${props.toggle==='light'?'black':'light'} ms-5 fs-3 cursor`} onClick={()=>{updateNote(note);}}/>
          </div>

          <Card.Subtitle className={`text-${props.toggle==='light'?'black':'light'} mb-2 `}>{note.tag}</Card.Subtitle>
          <Card.Text className={`text-${props.toggle==='light'?'black':'light'}`}>
            {note.description}
          </Card.Text>
        </Card.Body>
      </Card>
  )
}


