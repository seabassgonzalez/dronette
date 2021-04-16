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
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribedUserPosts';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  // if user closes out without logging out, state gets destroyed, should update state
  const {state, dispatch} = useContext(UserContext);

  useEffect(()=>{
    // use JSON.parse because user is a string
    const user = JSON.parse(localStorage.getItem("user"));
    console.log('user parsed is: ', user);
    // double check that user is a string
    console.log(typeof(user), user);
    if(user){
      // if user dispatch action type USER and payload of this user
      dispatch({type:"USER", payload:user});
      // history.push('/');
    }else{
      history.push('/login'); 
    }
  }, []);

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
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingposts">
        <SubscribedUserPosts />
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
