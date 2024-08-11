import React, { useEffect, useState } from 'react';
import './App.css';
import { BarGraph } from './components/graphs/bar-graphs';
import { Route, Router, Routes } from 'react-router-dom';
import ErrorPage from './pages/error';
import Analytics from './pages/analytics/analytics';
import Item_table from './components/tables/item_table';
import ItemCard from './pages/cards/itemCard/item.card';
import PaymentNotes from './pages/paymentNotes/PaymentNotes';
import MrOutstandingPDF from './components/pdf-creators/MrOutstandingPDF';
import PartyItemHistoryPDF from './components/pdf-creators/PartyItemHistory';
import Loader from './components/loader/loader';
import Home from './pages/home/Home';
import { backend_start_api } from './api/api';
import Note from './components/payment-notes/note';

function App() {

  const [visibility, setVisibility] = useState(false);

  const [width , setWidth] = useState(window.innerWidth);

  useEffect(()=>{
    setWidth(window.innerWidth);
  }, [window.innerWidth])

  const start_backend = async () => {
    try {
      const data = await backend_start_api();
      if (data.statusCode === 200) {
        setVisibility(true);
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    start_backend();
  }, []);


  return (

    visibility ? 
    <div style={{width:`${width}px`}}>
      <Routes>
      <Route path='/' element={<div><Home /></div>} />
      <Route path='/analytics' element={<div><Analytics /></div>} />
      <Route path='/payment-notes' element={<div><PaymentNotes type="all"/></div>} />
      <Route path='/payment-notes/create' element={<div><PaymentNotes type="create"/></div>} />
      <Route path='/payment-notes/:date' element={<div><Note /></div>} />
      <Route path='/pdf-creator/mrOutstanding' element={<div><MrOutstandingPDF /></div>} />
      <Route path='/pdf-creator/party-item-history/:partyID' element={<div><PartyItemHistoryPDF /></div>} />
      <Route path='/items' element={<div><Item_table /></div>} />
      <Route path='/item' element={<div><ItemCard /></div>} />
      <Route path='/error/:page' element={<div><ErrorPage /></div>} />
    </Routes>
    </div>
    :
    <div style={{height:"100vh"}}>
      <Loader />
    </div>

  );
}

export default App;
