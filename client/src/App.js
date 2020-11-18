import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/layout/auth/Login';
import Register from "./components/layout/auth/Register"
import { Provider } from "react-redux";
import store from './redux/store'

import {BrowserRouter as Router, Route  } from "react-router-dom";

import './App.css';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
        <Navbar/>
     <Route exact path='/' component={Landing} />
     <div className='container'>
     <Route exact path='/register' component={Register} />
     <Route exact path='/login' component={Login} />
      </div>
        <Footer/>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
