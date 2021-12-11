import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
            <Switch>
                <Route path="./" component={Home} exact />
                <Route path="./menu" component={Menu} />
                <Route component={Error} />
            </Switch>
        </div>
    )
    }
}

export default App;
