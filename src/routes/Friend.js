import React from 'react'
import 'style/Profile.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from 'component/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faComment, faGift, faPhone } from '@fortawesome/free-solid-svg-icons';

function Friend(){
  const location = useLocation();

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/');
  }

  const back = () =>{
    navigate(-1)
  }

  const {email,images,userimg,message,name,profile_message,id} = location.state;

  return (
    <div className='profiles'>
      <header className='main'>
      <Header
        h1 = {name}
        spanH1={""}
        leftItem={<FontAwesomeIcon icon={faAngleLeft} onClick={back}/>}
        rightItem={""}
      />
      </header>

      <main className='main'>
        <section className='backgroundProfile' style={{backgroundImage: `url(${images}`}}>
          <h2 className='blind'>friend profile background image</h2>
        </section>

        <section className='profile'>
          <h2 className='blind'>Friend profile</h2>
          <div className='profile_img empty' style={{backgroundImage: `url(${userimg}`}}></div>
          <div className='profile_content'>
            <span className="profile_name">{name}</span>
            <span className="profile_email">{email}</span>
            <span className='profile_message'>{profile_message}</span>
          </div>
          <ul className="profile_menu">
            <li>
              <Link to={'/Chattings'} state={{email,images,userimg,message,name,profile_message,id}}>
                <span><FontAwesomeIcon icon={faComment}/></span>
              </Link>
              Chatting
            </li>
            <li><span><FontAwesomeIcon icon={faPhone}/></span> Call</li>
            <li><span><FontAwesomeIcon icon={faGift}/></span>Gift</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Friend