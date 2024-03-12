import React from 'react';
import './App.css';
import { BarGraph } from './components/graphs/bar-graphs';
import { Route, Router, Routes } from 'react-router-dom';
import ErrorPage from './pages/error';
import Best_sale_by_month from './components/tables/tables';
import Analytics from './pages/analytics/analytics';

function App() {

  return (
    // <div className="App">
    //   <BarGraph />   

    // </div>
    <Routes>
      <Route path='/analytics' element={<div><Analytics /></div>}/>
      <Route path='/error/:page' element={<div><ErrorPage /></div>}/>
    </Routes>
  );
}

export default App;
