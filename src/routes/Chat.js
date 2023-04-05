import React from 'react'
import '../style/Chat.scss';
import Header from '../component/Header'
import Tab from '../component/Tab'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import users from '../data/users.json'
import Chattings from '../component/Chattings';


function Chat(){
  
  return (
    <>
    <header className='main'>
    <Header 
      h1 = {'Chats▼'}
      spanH = {''}
      left = {'Edit'}
      right = {' '}
    />
    </header>
    <main className='main'>
    <form className='search_box'>
      <fieldset className='search_inner'>
      <legend class="blind">검색창</legend>
          <FontAwesomeIcon icon={faMagnifyingGlass}/>
          <input type="search" name="search" id="search" placeholder="flnd friends,chat,Plus Friends"/>
      </fieldset>
      </form>
      <section className="main_section">
      <header><h2 className="blind">Friends</h2></header>
      <ul>
      {users.map(user=><Chattings
          id = {user.id}
          profileMesg = {user.profile_message}
          username = {user.name}
          message = {user.message}
          userimg = {user.userimg}
          backimg = {user.images}
          email = {user.email}
          />)}
      </ul>
    </section>
    <div className="chat_fa_btn">
      <a href="#">
        <FontAwesomeIcon icon={faComment}/>
      </a>
    </div>
    </main>
    <Tab />
    </>
  )
}

export default Chat