import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from './pages/home.js'
import Offers from './pages/offers.js';
import Sell from './pages/sell.js';

function App() {
    //<Route path='/profile' component={<Profile/>} />
  return (
      <Router>
        <div>
            <Navbar bg="success" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Room123 Token</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/offers">Offers</Nav.Link>
                        <Nav.Link href="/sell">Sell</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/offers' element={<Offers/>} />
                <Route path='/sell' element={<Sell/>} />    
            </Routes>
        </div>
      </Router>
  );
  }
    
  export default App;