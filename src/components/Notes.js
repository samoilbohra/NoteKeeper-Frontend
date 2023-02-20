import React, { useContext, useEffect , useRef,useState } from 'react'
import {useNavigate}  from 'react-router-dom'

import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem'; 


export default function Notes(props) {
  const navigate = useNavigate();

const[ note , setNote] = useState({id : "", etitle : "" , edescription : "" , etag : "default"});
  const context = useContext(noteContext);
  useEffect(()=>{
if(!localStorage.getItem('token'))
{
  navigate('/login');
}
else
{

  context.fetchNotes();
}
  })
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id: currentnote._id, etitle : currentnote.title , edescription : currentnote.description , etag: currentnote.tag})

  }
  const ref = useRef(null);
  const closeref = useRef(null);
  const handleChange =(e)=>{
    setNote({...note , 
      [ e.target.name] : e.target.value
       });
  }
  const handleClick =(e)=>{
    e.preventDefault();
    console.log("updating notes")
    context.editNote({id:note.id , title: note.etitle  ,description: note.edescription ,tag: note.etag});
    closeref.current.click();
    props.showAlert("success" , "Note Edited Successfully"); 

  }


  return (
    <div>
         {/* <!-- Button trigger modal --> */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT NOTE</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className='my-3'>
   <form>
  <div className="mb-3 ">
    <label htmlFor="etitle" className="form-label">TITLE</label>
    <input type="text" className="form-control" id="etitle" name = 'etitle' value={note.etitle}  onChange={handleChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">DESCRIPTION</label>
    <input type="text" className="form-control" id="edescription" name = 'edescription' value={note.edescription} onChange={handleChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">TAG</label>
    <input type="text" className="form-control" id="etag" name = 'etag'value={note.etag}  onChange={handleChange}/>
  </div>
 
</form>
    </div>      </div>
      <div className="modal-footer">
        <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
        <button disabled={note.etitle.length < 5  || note.edescription.length <5 } type="button" className="btn btn-primary" onClick={handleClick}>Save Note</button>
      </div>
    </div>
  </div>
</div>  

        <div className='row mx-3'>
        <div>{context.notes.length ===0 && "no notes to display"}</div>
      {context.notes.map((note)=>{
               return <NoteItem key =  {note._id} updateNote = {updateNote}  note= {note}  showAlert={props.showAlert} />
     })}
     </div>
    </div>
  )
}
