import React, { useState } from 'react'
import AddNote from './AddNote'
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/esm/Button';
import { IoAddSharp } from "react-icons/io5";
import Notes from './Notes';

export default function Home(props) {
  const [open, setOpen] = useState(false);
  
  return (
    <div className={`container-fluid bg-${props.toggle} text-${props.toggle === 'light' ? 'dark' : 'light'}`}>
      <div className='d-flex mb-2'>
        <h1 className='text-start'>Add Note</h1>
        <Button
          className={`bg-${props.toggle === 'light' ? 'light' : 'dark'} text-end ms-auto `}
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          <IoAddSharp className={`text-${props.toggle === 'light' ? 'dark' : 'white'}`} />
        </Button>
      </div>

      <Collapse in={open}>
        <div id="example-collapse-text">
          <AddNote toggle={props.toggle} togglemode={props.togglemode} />
        </div>
      </Collapse>
      <hr/>
      <h1 className='text-start'>Your Notes</h1>
      <div className="row">
        <Notes toggle={props.toggle} togglemode={props.togglemode}/>
      </div>
      

    </div>
  )
}
