import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment, faMagnifyingGlass, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import '../style/Tab.scss';
import { Link, useLocation } from 'react-router-dom';

function Tab() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(null);

  const tabs = [
    { icon: faUser, to: '/' },
    { icon: faComment, to: '/chat' },
    { icon: faMagnifyingGlass, to: '/find' },
    { icon: faEllipsis, to: '/more' },
  ];

  // 클릭 이벤트 핸들러
  const handleClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <nav className='tab_bar'>
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => handleClick(index)}
            className={`${location.pathname === tab.to ? 'on' : ''} ${selectedTab === index ? 'on' : ''}`}
          >
            <Link to={tab.to}>
              <FontAwesomeIcon icon={tab.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Tab;
