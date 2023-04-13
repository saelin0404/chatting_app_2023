import React from 'react'
import { Link } from 'react-router-dom';

function Chat({friendData}) {
  const {friendData:email,images,userimg,message,name,profile_message,id} = friendData;
  return (
    <li>
      <Link to={'/chattings'} state={friendData}>
        <span className="chats_img empty" style={{backgroundImage: `url(${userimg}`}}></span>
        <span className="chats_content">
          <span className="chats_name">{name}</span>
          <span className="chats_message">{message[1]}</span>
        </span>
        <span className="chats_time"><span>15</span>:<span>33</span></span>
      </Link>
    </li>
  )
}

export default Chat