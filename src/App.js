import React from 'react';
import Home from './components/Home';
import { Routes, Route, Switch } from 'react-router-dom';
import './style.css';

const App = () => {

  return (
    <div>
      <Switch>
         <Routes>
           <Route path="/" component={Home} />
         </Routes>
      </Switch>
    </div>
  )
}

export default App; 
