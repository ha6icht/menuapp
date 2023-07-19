import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Error from "./components/Error/Error";
import Navbar from "./components/Navbar/Navbar";

class App extends React.Component{
    
    render(){
      return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/menuapp" Component={Home} exact />
                <Route path="/menuapp/menu" Component={Menu} />
                <Route Component={Error} />
            </Routes>
        </div>
    )
    }
}

export default App;
