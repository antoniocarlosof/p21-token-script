import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home.js'
import Offers from './pages/offers.js';
import Sell from './pages/sell.js';

function App() {
    //<Route path='/profile' component={<Profile/>} />
  return (
      <Router>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/offers' element={<Offers/>} />
          <Route path='/sell' element={<Sell/>} />    
      </Routes>
      </Router>
  );
  }
    
  export default App;