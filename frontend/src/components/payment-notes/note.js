import React, { useEffect, useState } from 'react';
import "./styles/note.css";
import img from "./image/notebook(1).png"
import coffeeImg from "./image/coffeeImg.png"
import { deleteByID, fetchNoteByDate, updateByID } from '../../api/paymentNotes.api';
import { useParams } from "react-router-dom"
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';

const Note = () => {
  const { date } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteData, setNoteData] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [notes, setNotes] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await fetchNoteByDate({ date });
      setData(data[0]);
      setNotes(data[0]?.notes?.slice((page - 1) * 4, ((page - 1) * 4) + 4));
    } catch (err) {
      console.log(err);
    }
  }

  const deleteNote = async (noteID, partyID) => {
    try {
      await deleteByID({ noteID, partyID });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, date]);

  const handleNoteDataChange = (e) => {
    setNoteData(e.target.value);
  }

  const submitNarrationChange = async(noteID, narration) => {
    try{
      const {data} = await updateByID({noteID, narration});
      console.log(data);
    }
    catch(err){
      console.log(err);
    }
  }



  return (
    <div className='note'>
      <div className='notebook-container container1'>
        <div className='notebook-image-container'>
          <img className="notebook-img" src={img} alt="Notebook" />
        </div>
        <div className='notebook-table'>
          <h2>Date: {data?.date}</h2>
          <div className='thead'>
            <div className='party-name note-column'>Party Name</div>
            <div className='note-column'>Bill Number</div>
            <div className='note-column'>Bill Date</div>
            <div className='narration note-column'>Narration</div>
          </div>
          <hr />
          <div className='tbody'>
            {
              notes?.map((note) => (
                <div className='table-row' key={note._id}>
                  <div className='party-name note-column'>{note.party.partyName}</div>
                  <div className='note-column'>{note.billNumber}</div>
                  <div className='note-column'>{note.billDate}</div>
                  <div className='narration note-column'>
                    {editingNoteId === note._id ? (
                      <textarea
                        value={noteData}
                        name='narration'
                        onChange={handleNoteDataChange}
                        onBlur={() => {
                          console.log(note._id);
                          submitNarrationChange(note._id, noteData);
                          setEditingNoteId(null);
                        }}
                      />
                    ) : (
                      <span onClick={() => {
                        setEditingNoteId(note._id);
                        setNoteData(note.narration);
                      }}>{note.narration}</span>
                    )}
                  </div>
                  <div className='delete-button' onClick={() => {
                    if (window.confirm("Are you sure you want to delete this note?")) {
                      deleteNote(note._id, note.party._id);
                    }
                  }}>
                    <DeleteIcon
                      sx={{
                        height: "0.7rem",
                        margin: "10px 0",
                        color: "grey",
                        "&:hover": {
                          color: "red"
                        }
                      }}
                    />
                  </div>
                </div>
              ))
            }
            <div className='pagination'>
              <Pagination
                count={Math.ceil(data?.notes?.length / 4)}
                page={page}
                onChange={(e, value) => setPage(value)}
              />
            </div>
          </div>
        </div>
      </div>
      <img className='coffee-img container2' src={coffeeImg} alt="Coffee" style={{ width: "500px", height: "300px" }} />
    </div>
  );
}

export default Note;
