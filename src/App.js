import React, { useEffect, useState } from 'react'
import AppRouter from 'Router'
import {authService} from 'fbase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLogIn,setIsLogIn] = useState(false);
  const [user,setUser] = useState(null);

  //사용자 정보다운로드
  useEffect(()=>{
    onAuthStateChanged(authService, (u) => { 
      if (u) {
        setIsLogIn(u);
        setUser(u);
      } else {
        setIsLogIn(false);
      }
    });
  },[])

  return (
    <>
    <AppRouter isLogIn = {isLogIn} user = {user}/>
    </>
  )
}

export default App