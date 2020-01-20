import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import InsertCliente from './components/InsertCliente'
import ReactGa from 'react-ga';

function App() {

  useEffect(() => {
    ReactGa.initialize('UA-156465088-1')

    //reporta o page view
    ReactGa.pageview('/home')
  }, [])

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark ustify-content-between">
          <span className="navbar-brand mb-0 h1">Lista de Clientes</span>
          <button className="btn btn-primary my-2 my-sm-0" type="button" data-toggle="modal" data-target="#cadCliente"><i className="icon ion-md-person-add"></i></button>
        </nav>
      <div className="container">        
        <Home></Home>
      </div>
      <InsertCliente></InsertCliente>
    </div>
  );
}

export default App;
