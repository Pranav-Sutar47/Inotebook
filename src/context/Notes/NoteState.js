import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { showToast } from "../../components/ToastComponent";

const NoteState = (props) => {
  const s1 = []
  const [notes, setNotes] = useState(s1);
  const myHeaders = new Headers();
  const host = 'http://localhost:5000'

  const getNotes = async () => {
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", localStorage.getItem('token'));
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: myHeaders,
    });
    const json = await response.json();

    setNotes(json);

    
  }

  const editNotes = async(id,title,tag,description)=>{
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", localStorage.getItem('token'));
  
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method: "PUT",
      headers: myHeaders,
      body : JSON.stringify({title,tag,description}) 
    })
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json);
    let newNote = JSON.parse(JSON.stringify(notes));
    for(let index = 0;index<newNote.length;index++){
      const ele = newNote[index];
      if(ele._id===id){
        newNote[index].title = title;
        newNote[index].tag = tag;
        newNote[index].description = description;
        break;
      }
    }
    setNotes(newNote);
    showToast('Note Updated!!','info');
    //console.log(json);
  }

  const addNote = async (title, description, tag) => {
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", localStorage.getItem('token'));
    //console.log(myHeaders);
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: myHeaders,
      body : JSON.stringify({title,tag,description})
    });
    const json = await response.json();
    setNotes(notes.concat(json));

    showToast('Note Added Successfully!', 'info');
  }

  const deleteNote = async(id) => {

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("auth-token", localStorage.getItem('token'));

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: myHeaders,
    });
    await response.json();

    const newNote = notes.filter((note) => {
      return note._id !== id;
     })
    setNotes(newNote);

  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, getNotes ,editNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;