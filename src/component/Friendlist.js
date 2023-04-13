import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Friendlist({friendData}){
  console.log(friendData);
  const {friendData:email,images,userimg,message,name,profile_message,id} = friendData;
  return (
    <li>
      <Link to={'/friend'} state={friendData}>
      <span className='profile_img empty' style={{backgroundImage: `url(${userimg}`}}></span>
      <span className='profile_name'>{name}</span>
      <span className='profile_message'>{profile_message}</span>
      </Link>
    </li>
  )
}

export default Friendlist