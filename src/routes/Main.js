import '../style/Main.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Tab from '../component/Tab'
import Header from '../component/Header'
import Friendlist from '../component/Friendlist';
import users from '../data/users.json';




function Main({userObj}){
  return (
    <>
    <header className='main'>
    <Header 
    h1 = {'Friends'}
    spanH ={1}
    left = {'manage'}
    right = {<FontAwesomeIcon icon={faGear}/>}
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
      <section className='main_section'>
        <header className='main_header'><h2>My Profile</h2></header>
        <ul>
          <li>
            <Link to={"/Myprofile"} userObj={userObj}>
              <span className='profile_img empty' style={{backgroundImage: `url(${userObj.photoURL}`}}></span>
              <span className='profile_name'>{userObj.displayName}</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className='main_section' >
        <header><h2>Friends</h2></header>
        <ul>
          {users.map(user=><Friendlist
          profileMesg = {user.profile_message}
          username = {user.name}
          message = {user.message}
          userimg = {user.userimg}
          backimg = {user.images}
          email = {user.email}
          />)}
        </ul>
      </section>
    </main>
    <Tab />
    </>
  )
}

export default Main