import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBatteryFull, faHeart, faVolumeXmark, faWifi } from '@fortawesome/free-solid-svg-icons';
import { faBluetoothB } from '@fortawesome/free-brands-svg-icons';

function Header({h1,leftItem,rightItem,spanH1}) {
  const location = useLocation()
  const pathname = location.pathname;
  const [back,setBack] = useState();

  useEffect(()=>{
    if(pathname === "/chattings"){
      setBack("/chats")
    }else{
      setBack("/")
    }
  },[])

  return (
    <>
    <div className='status_bar'>
      <div className='left_item'>
        <FontAwesomeIcon icon={faHeart}/>
        <span>13</span>:<span>30</span>
      </div>
      <div className='right_item'>
        <FontAwesomeIcon icon={faBluetoothB}/>
        <FontAwesomeIcon icon={faVolumeXmark}/>
        <FontAwesomeIcon icon={faWifi}/>
        <span>90</span><span>%</span>
        <FontAwesomeIcon icon={faBatteryFull}/>
      </div>
    </div>
    <div className='title_bar'>
      <h1>{h1}<span>{spanH1}</span></h1>
      <div className='left_item'><Link to={back}>{leftItem}</Link></div>
      <div className='right_item'>{rightItem}</div>
    </div>
    </>
  )
}

export default Header