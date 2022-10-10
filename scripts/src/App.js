import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/home.js'
import Offers from './pages/offers.js';

function App() {
    //<Route path='/sell' component={<Sell/>} />
    //<Route path='/profile' component={<Profile/>} />
  return (
      <Router>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/offers' element={<Offers/>} />    
      </Routes>
      </Router>
  );
  }
    
  export default App;