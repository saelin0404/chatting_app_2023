import React from 'react'
import Header from '../component/Header'
import Tab from '../component/Tab'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faCircleInfo, faComment, faGear, faGraduationCap, faHouseChimney, faPaintBrush, faPencil, faRightFromBracket, faTv, faUtensils, faWonSign,} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faFaceSmile, faHand} from "@fortawesome/free-regular-svg-icons";
import { faViadeo } from '@fortawesome/free-brands-svg-icons';
import '../style/More.scss';
import { useNavigate } from 'react-router-dom';
import { authService } from "fbase";

function More() {
  const navigate = useNavigate();
  const onLogOutClick = ()=>{
    authService.signOut();
    navigate('/')
  }
  return (
    <>
    <header className='main'>
    <Header 
      h1 = {'More'}
      spanH = {''}
      left = {''}
      right = {<FontAwesomeIcon icon={faGear}/>}
    />
    </header>
    <main className='main'>
    <section className="user_info">
      <h2 className="blind">사용자 정보</h2>
      <span className="profile_img empty"></span>
      <span className="profile_info">
        <span className="profile_name">My Name</span>
        <span className="profile_email">Userid@gmail.com</span>
      </span>
      <span className="chat_img"><a href="#"><FontAwesomeIcon icon={faRightFromBracket} onClick={onLogOutClick}/></a></span>
    </section>

    <section className="user_menu">
      <h2 className="blind">사용자 메뉴</h2>
      <ul>
        <li><a href="#"><FontAwesomeIcon icon={faFaceSmile}/></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faPaintBrush}/></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faHand}/></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faCircleUser}/></a></li>
      </ul>
    </section>
    <section className="plus_friends">
      <header>
        <h2>Plus Frienas</h2>
        <span><FontAwesomeIcon icon={faCircleInfo}/> Learn More</span>
      </header>
      <ul className="plus_list">
        <li><a href="#"><FontAwesomeIcon icon={faUtensils}/>Order</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faHouseChimney}/>Store</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faTv}/>TV Chaanel/Radio</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faPencil}/>Creation</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faGraduationCap}/>Education</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faBuildingColumns}/>Poiltics</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faWonSign}/>Finance</a></li>
        <li><a href="#"><FontAwesomeIcon icon={faViadeo}/>Movies</a></li>
      </ul>
    </section>
    <section className="more_app">
      <h2 className="blind">앱 더보기</h2>
      <ul>
        <li><a href="#"><span className="app_icon"></span>kakao story</a></li>
        <li><a href="#"><span className="app_icon"></span>Path</a></li>
        <li><a href="#"><span className="app_icon"></span>kakao friends</a></li>
      </ul>
    </section>
    </main>
    <Tab />
    </>
  )
}

export default More