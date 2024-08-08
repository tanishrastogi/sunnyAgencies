import React, { useEffect, useState } from 'react'
import "./styles/fetchall.css"
import { fetchAllNotes } from '../../api/paymentNotes.api';
import img from "./image/pcqrnnnni.png"
import { useNavigate } from 'react-router-dom';

const FetchAll = () => {

  const [data, setData] = useState([]);

  const navigate = useNavigate("/");  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const {data} = await fetchAllNotes();
      setData(data);
      console.log(data);
    }
    catch (err) {
      console.log(err);
    }
  };

  const handleClick = async(date)=>{
    try{
      navigate(`/payment-notes/${date}`)
    }
    catch(err){
      console.log(err);
    }
  };
  
  console.log(data);

  return (
    <div className='fetch-all-payment-notes'>
      {
        data?.map((note, index) => {
          return <div className='notes-container'>
            <img className='note-bg-img' src={img}></img>
            <p className='date'>{note.date}</p>
            <div className='party-names' onClick={()=>handleClick(note.date)}>
              {
                note?.parties?.map((party, index)=>{
                  return index<4?<p >{party.length>7?party.slice(0, 20):party}</p>:""
                })
              }
            </div>
          </div>
        })
      }
    </div>
  )
}

export default FetchAll