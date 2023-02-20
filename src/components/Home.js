import React, { useContext } from 'react'
import CreateNote from './CreateNote';
import Notes from './Notes';



export default function Home(props) {
  return (
    <div>
     <h1>Add  a Note </h1>
      <CreateNote showAlert ={props.showAlert} />
     <h1> Your Notes</h1>
     <Notes showAlert = {props.showAlert}/>
    </div>
  )
}
