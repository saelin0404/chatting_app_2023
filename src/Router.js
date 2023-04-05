import React from 'react'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import Main from './routes/Main'
import Auth from './component/Auth'
import Chat from 'routes/Chat';
import Find from 'routes/Find';
import Chatting from 'routes/Chatting';
import Myprofile from 'routes/Myprofile';
import More from 'routes/More';
import Profile from 'routes/Profile';


function Router({isLogIn,userObj}){

  return (
    <BrowserRouter>
    <Routes>
      {isLogIn ? (
        <>
        <Route path='/' element={<Main userObj = {userObj}/>}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/find' element={<Find />}/>
        <Route path='/more' element={<More />}/>
        <Route path='/chatting' element={<Chatting userObj = {userObj}/>}/>
        <Route path='/Myprofile' element={<Myprofile userObj = {userObj}/>}/>
        <Route path='/profile' element={<Profile />}/>
        </>
      ):(
      <Route path='/' element={<Auth/>}/>
      )}
    </Routes>
    </BrowserRouter>
  )
}

export default Router