import React from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/">

      </Route>
    </BrowserRouter>
  );
}

export default App;
