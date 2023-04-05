import React from 'react'
import Header from '../component/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faComment, faPencil, faUser } from "@fortawesome/free-solid-svg-icons";
import '../style/Profile.scss'
import { Link } from 'react-router-dom';


function Profile() {
  return (
    <>
    <header className='main profile'>
    <Header 
      h1 = {'Profile'}
      spanH = {''}
      left = {<FontAwesomeIcon icon={faAngleLeft}/>}
      right = {<FontAwesomeIcon icon={faUser}/>}
    />
    </header>
    <main className='pro'>
      <section className="background">
        <h2 className="blind">My profile background image</h2>
      </section>
      <section className="profile">
        <h2 className="blind">My profile info</h2>
        <div className="profile_img empty"></div>
        <div className="profile_cont">
          <span className="profile_neme">My Name</span>
          <input type="mail" className="profile_email" placeholder="userID@gmail.com"/>
          <ul className="profile_menu">
            <li>
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComment}/>
                </span>
                My Chatroom
              </a>
            </li>
            <li><a href="#"><span className="icon"><FontAwesomeIcon icon={faPencil}/></span>Edit Profile</a></li>
          </ul>
        </div>
    </section>
    </main>
    </>
  )
}

export default Profile