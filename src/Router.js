import Auth from 'component/Auth'
import React from 'react'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'
import Main from 'routes/Main'
import Friend from 'routes/Friend';
import More from 'routes/More';
import Chats from 'routes/Chats';
import Chattings from 'routes/Chattings';
import Myprofile from 'routes/Myprofile';
import Story from 'routes/Story';

function AppRouter({isLogIn,user}){
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      {isLogIn ? (
        <>
          <Route path='/' element={<Main user={user}/>}/>
          <Route path='/myprofile' element={<Myprofile user={user}/>}/>
          <Route path='/friend' element={<Friend/>}/>
          <Route path='/chats' element={<Chats/>}/>
          <Route path='/chattings' element={<Chattings user={user}/>}/>
          <Route path='/story' element={<Story user={user}/>}/>
          <Route path='/more' element={<More user={user}/>}/>
        </>
      ):(
        <Route path='/' element={<Auth />}/>
      )}
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter