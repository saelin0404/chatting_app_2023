import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment, faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";

function Tab(){
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);

  const tabs = [
    { icon: faUser, to: '/' },
    { icon: faComment, to: '/chats' },
    { icon: faHeart, to: '/story' },
    { icon: faEllipsis, to: '/more' },
  ];

  const handleClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <nav className='tab_bar'>
      <ul>
        {tabs.map((tab,index) => (
          <li
            key={index}
            onClick={()=> handleClick(index)}
            className={`${location.pathname === tab.to ? 'on' : ''} ${selectedTab === index ? 'on':''}`}
          >
            <Link to={tab.to}><FontAwesomeIcon icon={tab.icon}/></Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Tab