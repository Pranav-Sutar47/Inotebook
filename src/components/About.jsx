import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext';

export default function About(props) {
  let a = useContext(NoteContext);
  return (
    <div>
      <h1 className={props.toggle === 'light' ? 'text-black' : 'text-white'}>This is about {a.name}</h1>
      <div className="row">
        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
          <img src='./logo.png' alt='InoteBook' className='img-fluid m-1' />
        </div>
        <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
          <p className={`text-start m-1 text-${props.toggle==='light'?'dark':'light'}`}>
            INoteBook is a web-based application designed to help users manage their personal notes efficiently and securely.
            INoteBook is a versatile, secure, and user-friendly application designed to help users manage their notes efficiently. With its focus on security, ease of use, and performance, iNotebook is a valuable tool for anyone looking to keep their notes organized in the digital space.
          </p>
        </div>
      </div>

    </div>
  )
}
