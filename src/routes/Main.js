import React, { useEffect, useState } from 'react'
import 'style/Main.scss'
import { Link } from 'react-router-dom'
import datas from 'data/users.json'
import Tab from 'component/Tab';
import Header from 'component/Header';
import Friendlist from 'component/Friendlist'
import { collection, onSnapshot ,query, orderBy} from "firebase/firestore";
import { db  } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Main({user}){
  const [Message,setMessage] = useState('');
  useEffect(() => {
    const q = query(collection(db, `message`),
                  orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(newArray);
        if(newArray.length > 0){
          setMessage(newArray[0].text)
        }
    });
  },[]);

  return (
  <div className='main'>
    <div className='background'></div>
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
            <span><FontAwesomeIcon icon={faMagnifyingGlass}/></span>
        </fieldset>
      </form>

      <section className='main_section'>
        <header><h2 className='blind'>내 프로필</h2></header>
        <ul>
          <li>
            <Link to={'/myprofile'}>
            <span className='profile_img empty' style={user.photoURL ? {backgroundImage: `url(${user.photoURL})`} : {}}></span>
            <span className='profile_name'>{user.displayName}</span>
            {Message ? (<span className='profile_message'>{Message}</span>):(<></>)}
            </Link>
          </li>
        </ul>
      </section>

      <section className='main_section'>
        <header className='main_header'><h2>Friends</h2></header>
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