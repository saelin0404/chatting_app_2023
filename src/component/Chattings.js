import React, { useState,useLocation, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Chattings({profileMesg,username,message,userimg,backimg,email}){
  console.log(message);
  return (
    <li>
    <Link to={"/chatting"} state={{profileMesg,username,message,userimg,backimg,email}}>
      <span className="chats_img empty" style={{backgroundImage: `url(${userimg}`}}></span>
      <span className="chats_cont">
        <span className="chats_name">{username}</span>
        <span className="chats_latest">{message[1]}</span>
      </span>
      <span className="chats_time"><span>15</span>:<span>33</span></span>
    </Link>
  </li>
  )
}

//npm install prop-types
Chattings.propTypes={
  message:PropTypes.arrayOf(PropTypes.string.isRequired),//문자열을 원소로 가지고 있는 배열
}

export default Chattings