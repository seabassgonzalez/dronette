import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/Navbar';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/CreatePost';
import {reducer, initialState} from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  // if user closes out without logging out, state gets destroyed, should update state
  const {state, dispatch} = useContext(UserContext);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(typeof(user), user);
    // should call dispatch and make user dater available with state update using useContext
    if(user){
      dispatch({type:"USER", payload:user});
      history.push('/');
    }else{
      history.push('/login'); 
    }
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
    </UserContext.Provider>
  );
};

export default App;
