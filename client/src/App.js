import React, {useEffect, createContext, useReducer} from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer, initialState} from './reducers/userReducer';

export const userContext = createContext();

const Routing = () => {
  const history = useHistory();

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(typeof(user));
  });

  return (
    <Switch>
      <Route exact   path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
  );
};

export default App;
