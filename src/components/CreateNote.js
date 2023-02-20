import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext"

export default function CreateNote(props) {
const context = useContext(noteContext);
const[ note , setNote] = useState({title : "" , description : "" , tag : "default"});


    const handleClick=(e)=>
    {  e.preventDefault();
      context.addNote(note);
     props.showAlert("success" , "Note Added Succesfully")
      setNote({title : "" , description : "" , tag : ""});
    }
    const handleChange= (e)=>
    { 
  setNote({...note , 
   [ e.target.name] : e.target.value
    });
    
  }
  return (
    <div className='my-3'>
   <form>
  <div className="mb-3 ">
    <label htmlFor="title" className="form-label">TITLE *</label>
    <input type="text" className="form-control" id="title" name = 'title' value={note.title}  onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">DESCRIPTION *</label>
    <input type="text" className="form-control" id="description" name = 'description'  value={note.description} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">TAG</label>
    <input type="text" className="form-control" id="tag" name = 'tag' value={note.tag}  onChange={handleChange}/>
  </div>
 
  <button disabled={note.title.length < 5  || note.description.length <5 } type="submit" className="btn btn-primary" onClick={handleClick}>ADD NOTE</button>
</form>
    </div>
  )
}
