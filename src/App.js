import { useEffect, useState } from 'react';
import 'style/App.css';
import Router from 'Router';
import { authService } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLogIn,setIsLogIn] = useState(false);
  const [userObj,setUserObj] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(authService, (user) => { 
      console.log("user->",user);
      if (user) {
        setIsLogIn(user);
        setUserObj(user);
      } else {
        setIsLogIn(false);
      }
    });
  },[])

  return (
  <>
  <Router isLogIn={isLogIn} userObj = {userObj}/>
  </>
  );
}

export default App;
