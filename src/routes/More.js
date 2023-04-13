import React from 'react'
import 'style/More.scss'
import { useNavigate } from 'react-router-dom'
import Header from 'component/Header'
import Tab from 'component/Tab'
import { authService } from "fbase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faViadeo } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faFaceSmile, faHand} from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faBuildingColumns, faCircleInfo, faGear, faGraduationCap, faHouseChimney, 
         faPaintBrush, faPencil, faRightFromBracket, faTv, faUtensils, faWonSign,} 
         from "@fortawesome/free-solid-svg-icons";


function More() {
  const navigate = useNavigate();
  const onLogOutClick = ()=>{
    authService.signOut();
    navigate('/')
  }

  return (
    <div className='more'>
      <header className='main'>
        <Header
        h1 = {''}
        spanH1={""}
        leftItem={<FontAwesomeIcon icon={faAngleLeft}/>}
        rightItem={<FontAwesomeIcon icon={faGear}/>}
        />
      </header>

      <main className='main'>
        <section className='user_info'>
          <h2 className='blind'>User Information</h2>
          <span className="profile_img empty"></span>
          <span className="profile_info">
            <span className="profile_name">My Name</span>
            <span className="profile_email">Userid@gmail.com</span>
          </span>
          <span className="log_out"><FontAwesomeIcon icon={faRightFromBracket} onClick={onLogOutClick}/></span>
        </section>

        <section className="user_menu">
          <h2 className="blind">사용자 메뉴</h2>
          <ul>
            <li><FontAwesomeIcon icon={faFaceSmile}/></li>
            <li><FontAwesomeIcon icon={faPaintBrush}/></li>
            <li><FontAwesomeIcon icon={faHand}/></li>
            <li><FontAwesomeIcon icon={faCircleUser}/></li>
          </ul>
        </section>

        <section className="plus_friends">
          <header>
            <h2>Plus Frienas</h2>
            <span><FontAwesomeIcon icon={faCircleInfo}/> Learn More</span>
          </header>
          <ul className="plus_list">
            <li><FontAwesomeIcon icon={faUtensils}/>Order</li>
            <li><FontAwesomeIcon icon={faHouseChimney}/>Store</li>
            <li><FontAwesomeIcon icon={faTv}/>TV Chaanel/Radio</li>
            <li><FontAwesomeIcon icon={faPencil}/>Creation</li>
            <li><FontAwesomeIcon icon={faGraduationCap}/>Education</li>
            <li><FontAwesomeIcon icon={faBuildingColumns}/>Poiltics</li>
            <li><FontAwesomeIcon icon={faWonSign}/>Finance</li>
            <li><FontAwesomeIcon icon={faViadeo}/>Movies</li>
          </ul>
        </section>

        <section className="more_app">
          <h2 className="blind">앱 더보기</h2>
          <ul>
            <li><span className="app_icon"></span>kakao story</li>
            <li><span className="app_icon"></span>Path</li>
            <li><span className="app_icon"></span>kakao friends</li>
          </ul>
        </section>
      </main>
      <Tab/>
    </div>
  )
}

export default More