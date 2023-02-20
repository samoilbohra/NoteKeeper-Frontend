import react, { useState } from 'react';
import noteContext from './NoteContext';

const NoteState = (props)=>
{  
  const host = "https://notekeeperbackend.onrender.com";
  const NoteInitial =[];
const  [notes , setNotes] = useState(NoteInitial);
   

//  //  API CALL for fetching notes 
const fetchNotes = async()=>{

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token') 
    },
    
  });
  const json = await response.json(); 
  setNotes(json);
}




//  add a note
 const addNote= async({title , description , tag})=>
  { 
  //  API CALL
  const response = await fetch(`${host}/api/notes/addnotes`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },
    body: JSON.stringify({ title , description , tag})
  });
const json = await response.json(); 
console.log(json);  

setNotes(notes.concat(json));


  }

//  edit a note
 const editNote = async ({id , title , description , tag})=>
 { 
  //  API CALL
  const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')
    },
   
    body: JSON.stringify({ title , description , tag})
  });
const json = await response.json();
console.log(json); 


  //  logic for frontend 
  for(let i =0 ; i< notes.length ; i++)
  {
    if(notes[i]._id == id )
 {
  notes[i].title = title ;
  notes[i].description = description;
  notes[i].tag =  tag;
 }
  }
 }

// delete note 
const deleteNote = async(id)=>
 { 
    //  API CALL
  const response = await fetch(`${host}/api/notes/DeleteNotes/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : localStorage.getItem('token')

    },
   
    body: JSON.stringify()
  });
const json = response.json(); 

  //  logic for frontend 


   console.log("deleted the note " + id);
 const  newNotes = notes.filter( (note)=>
   {
return note._id != id;
   });
   setNotes(newNotes);
 }

    return (
        <noteContext.Provider value={{notes,addNote , editNote , deleteNote , fetchNotes}} >
            {props.children }
        </noteContext.Provider>
    )
 
    }
 
export default NoteState;