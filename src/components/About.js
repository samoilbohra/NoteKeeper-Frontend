import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/NoteContext'

export default function About() {
  const  a = useContext(noteContext)
  
  return (
    <div>
      this is about page
    </div>
  )
}
