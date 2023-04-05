import React from 'react'
import { Link, useLocation,useNavigate} from 'react-router-dom';
import Header from '../component/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faComment, faGift, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import '../style/Profile.scss'


function Profile(){
  const location = useLocation();

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/');
  }
  const click = () =>{
    navigate(-1)
  }

  const {profileMesg,username,message,userimg,backimg,email} = location.state;
  return (
    <>
    <header className='main profile'>
    <Header 
      h1 = {'Profile'}
      spanH = {''}
      left = {<FontAwesomeIcon icon={faAngleLeft} onClick={click}/>}
      right = {<FontAwesomeIcon icon={faUser}/>}
    />
    </header>
    <main className='pro'>
      <section className="background" style={{backgroundImage: `url(${backimg}`}}>
        <h2 className="blind">My profile background image</h2>
      </section>
      <section className="profile">
        <h2 className="blind">My profile info</h2>
        <div className="profile_img empty" style={{backgroundImage: `url(${userimg}`}}></div>
        <div className="profile_cont">
          <span className="profile_neme">{username}</span>
          <span className="profile_email">{email}</span>
          <span className='profile_message'></span>
          <ul className="profile_menu">
            <li>
              <Link to={'/chatting'} state={{profileMesg,username,message,userimg,backimg,email}}><span className="icon"><FontAwesomeIcon icon={faComment}/></span>Chatting</Link>
            </li>
            <li>
              <a href="#"><span className="icon"><FontAwesomeIcon icon={faPhone}/></span>Call</a>
            </li>
            <li>
              <a href="#"><span className="icon"><FontAwesomeIcon icon={faGift}/></span>Gift</a>
            </li>
          </ul>
        </div>
    </section>
    </main>
    </>
  )
}

export default Profile
