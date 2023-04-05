import React, { useEffect, useState } from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlane,faWifi,faBatteryFull,faGear} from "@fortawesome/free-solid-svg-icons";
import {faMoon} from "@fortawesome/free-regular-svg-icons";
import {faBluetoothB} from "@fortawesome/free-brands-svg-icons";
import '../style/Header.scss';
import { Link, useLocation } from 'react-router-dom';

function Header({h1,left,right,spanH}) {
  const location = useLocation()
  const pathname = location.pathname;
  const [back,setBack] = useState();

  useEffect(()=>{
    if(pathname === "/profile"){
      setBack("/")
    }else if(pathname === "/chatting"){
      setBack("/chat")
    }
  })
  
  return (
    <>
      <div className='status_bar'>
        <div className='left_item'>
        <FontAwesomeIcon icon={faPlane} />
        <FontAwesomeIcon icon={faWifi} />
        </div>
        <div className='center_item'>
          <span>15</span>:<span>13</span>
        </div>
        <div className='right_item'>
        <FontAwesomeIcon icon={faMoon} />
        <FontAwesomeIcon icon={faBluetoothB} />
        <span>100</span><span>%</span>
        <FontAwesomeIcon icon={faBatteryFull} />
        </div>
      </div>

      <div className='title_bar'>
        <h1>{h1}<span>{spanH}</span></h1>
        <div className='left_item'><Link to={back}>{left}</Link></div>
        <div className='right_item'>{right}</div>
      </div>
    </>
  )
}
export default Header