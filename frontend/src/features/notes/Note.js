// create a Note functional component to be used with the api slice
// import the faPenToSquare from fontawesome
// import the useNavigate hook from react-router-dom
// import useSelector from react-redux
// import selectNoteById from the notesApiSlice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNoteById } from "./NotesApiSlice";


const Note = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))
    const navigate = useNavigate()

    if(note){
        const created = new Date(note.createdAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
        })
        const updated = new Date(note.updatedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
        })

        const handleEdit = () => {navigate(`/dash/notes/${noteId}`)}
console.log('heuston we have a note')
        return (
            <>
                <h1>In notes route frontend</h1>
                <tr>
                    <td className='table__cell'>{note.title}</td>
                    <td className='table__cell'>{note.content}</td>
                    <td className='table__cell'>{created}</td>
                    <td className='table__cell'>{updated}</td>
                    <td className='table__cell'>
                        <button onClick={handleEdit}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </td>
                </tr>
            </>
        )

    } else return (<><h1>Fakes</h1></>)
}

export default Note