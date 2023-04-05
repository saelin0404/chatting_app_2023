import React from 'react'
import { Link } from 'react-router-dom'


function Friendlist({profileMesg,username,message,userimg,backimg,email}){
  return (
    <li>
      <Link to={'/profile'} state={{profileMesg,username,message,userimg,backimg,email}}>
      <span className="profile_img empty" style={{backgroundImage: `url(${userimg}`}}></span>
      <span className="profile_name">{username}</span>
      <span className="profile_message">{profileMesg}</span>
      </Link>
    </li>
  )
}


export default Friendlist