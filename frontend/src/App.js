import React from 'react';
import './App.css';
import { BarGraph } from './components/graphs/bar-graphs';
import { Route, Router, Routes } from 'react-router-dom';
import ErrorPage from './pages/error';

function App() {

  return (
    // <div className="App">
    //   <BarGraph />   

    // </div>
    <Routes>
      <Route path='/analytics' element={<div><BarGraph /></div>}/>
      <Route path='/error/:page' element={<div><ErrorPage /></div>}/>
    </Routes>
  );
}

export default App;
