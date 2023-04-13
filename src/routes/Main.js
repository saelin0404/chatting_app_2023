import React, { useEffect, useState } from 'react'
import 'style/Main.scss'
import { Link } from 'react-router-dom'
import datas from 'data/users.json'
import Tab from 'component/Tab';
import Header from 'component/Header';
import Friendlist from 'component/Friendlist'
import { collection, addDoc , onSnapshot ,query, orderBy , getDocs, deleteDoc,where} from "firebase/firestore";
import { db , storage } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Main({user}) {
  const[profileMessage,setProfileMessage] = useState([]);
  const[attachmentBack,setAttachmentBack] = useState();

  console.log(profileMessage);

  return (
  <div className='main'>
    <header className='main'>
      <Header
      h1 = {'Friends'}
      spanH1={""}
      leftItem={""}
      rightItem={
        <>
        <FontAwesomeIcon icon={faBars}/>
        <FontAwesomeIcon icon={faGear} />
        </>
      }/>
    </header>

    <main className='main'>
      <form className='search_box'>
        <fieldset className='search_inner'>
        <legend class="blind">검색창</legend>
            <input type="search" name="search" id="search" placeholder="Find Friends,Chat"/>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </fieldset>
      </form>

      <section className='main_section'>
        <header><h2 className='blind'>내 프로필</h2></header>
        <ul>
          <li>
            <Link to={'/myprofile'} >
            <span className='profile_img empty'></span>
            <span className='profile_name'></span>
            </Link>
          </li>
        </ul>
      </section>

      <section className='main_section'>
        <header className='main_header'><h2>친구 프로필</h2></header>
        <ul>
          {datas.map(user=><Friendlist friendData={user}/>)}
        </ul>
      </section>

    </main>

    <Tab/>
  </div>
  )
}

export default Main