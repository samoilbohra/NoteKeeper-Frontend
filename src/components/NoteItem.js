import React, { useContext , useRef} from 'react'
import noteContext from "../context/notes/NoteContext"




export default function NoteItem(props) {
const context = useContext(noteContext);
const handleDelete=()=>{
  ref.current.click();
  context.deleteNote(props.note._id);
  props.showAlert("success" , "DELETED NOTE SUCCESSFULLY ");
};
const ref = useRef(null);

  return (
<>


{/* <!-- Modal --> */}
<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">DELETE NOTE</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-footer">
        <button ref={ref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handleDelete} type="button" className="btn btn-primary">DELETE</button>
      </div>
    </div>
  </div>
</div>
    <div className='col-md-3  col-sm-6 '>
    <div className="card my-3">
  <div className="card-body">
  <div className='d-flex align-items-center'>
    <h5 className="card-title">{props.note.title}</h5>
    <i type='button' data-bs-toggle="modal" data-bs-target="#staticBackdrop"  className="fa-solid fa-trash mx-2"></i>
    <i onClick= {()=>{props.updateNote(props.note)}} className="fa-solid fa-pen-to-square mx-2" ></i></div>
    <p className="card-text">{props.note.description}</p>
   
  </div>
</div>


    </div>
    </>

  )
}
  
