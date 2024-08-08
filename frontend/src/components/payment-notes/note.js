import React, { useEffect, useState } from 'react';
import "./styles/note.css";
import img from "./image/notebook(1).png"
import coffeeImg from "./image/coffeeImg.png"
import { fetchById, fetchNoteByDate } from '../../api/paymentNotes.api';
import { useParams } from "react-router-dom"

const Note = () => {

  const { date } = useParams()

  console.log(date)

  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight - ((50 / 100) * window.innerHeight))

  const [page, setPage] = useState(1);

  const [data, setData] = useState({});
  const [notes, setNotes] = useState([]);

  console.log(`${width - (50 / 100) * width}px`)

  const fetchData = async () => {
    try {
      console.log(date);
      // const {data} = await fetchById({paymentNoteID:id})
      const { data } = await fetchNoteByDate({ date });
      console.log(data)
      setData(data[0]);
      setNotes(data[0]?.notes?.slice((page-1)*4, ((page-1)*4)+4))
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);


  console.log(data)

  return (
    <div className='note' >
      <div className='notebook-container container1'>
        <div className='notebook-image-container' ><img className="notebook-img" src={img} ></img></div>
        <div className='notebook-table' >
          <h2>{data.date}</h2>
          <div className='thead'>
            <div className='party-name note-column'>Party Name</div>
            <div className='note-column'>Bill Number</div>
            <div className='note-column'>Bill Date</div>
            <div className='narration note-column'>Narration</div>
          </div>
          <hr />
          <div className='tbody'>
            {
             notes?.map((note)=>{
              return <div className='table-row'>
                <div className='party-name note-column'>{note.party.partyName}</div>
                <div className='note-column'>{note.billNumber}</div>
                <div className='note-column'>{note.billDate}</div>
                <div className='narration note-column'>{note.narration}</div>
                
              </div>
             })
            }
          </div>
        </div>
      </div>
      <img className='coffee-img container2' src={coffeeImg} style={{ width: "500px", height: "300px" }}></img>
    </div>
  )
}

export default Note;