import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faComment, faPencil, faUser } from "@fortawesome/free-solid-svg-icons";
import '../style/Profile.scss'
import {async} from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { collection, addDoc , onSnapshot ,query, orderBy ,doc, getDoc} from "firebase/firestore";
import { db , storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL,getStorage, refFromURL } from "firebase/storage";


function Myprofile({userObj}) {
  console.log(userObj);
  const[newDisplayName,setNewDisplayName] = useState(userObj.displayName);
  const[attachment,setAttachment] = useState(userObj.photoURL); //빈문자열
  const[attach,setAttach] = useState(""); //빈문자열
  const[aaatt,setAaatt] = useState(attach)

  const onTweetSubmit = async (e)=>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url'); 
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))
        await updateProfile(userObj,{photoURL:attachmentUrl})
    } catch (e) {
      console.error(e)
    }
  }
  const onBackSubmit = async (e)=>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attach, 'data_url'); 
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))

    const docRef = await addDoc(collection(db, "tweets"), {
      createdAt: Date.now(), 
      creatorID: userObj.uid,
      attachmentUrl
    });

    } catch (e) {
      console.error(e)
    }
  }
  const onChange = (e)=>{
    const{target:{value}} = e;
    setNewDisplayName(value)
  }
  const onSubmit = async(e)=>{
    e.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await updateProfile(userObj,{displayName:newDisplayName})
    }
  }
  
  const onFileChange = (e)=>{
    console.log(e);
    const {target:{files}} = e;
    const thefile = files[0] 

    const reader = new FileReader();
   
    reader.onloadend = (finishdedEvent)=>{ 
      const {currentTarget:{result}} = finishdedEvent 
      setAttachment(result);

    }
    reader.readAsDataURL(thefile)// 데이타url로 바꿔줌 //이 동작이 실행된후에 reader.onloadend을 읽어드리기 시작함
  }

  const onFile = (e)=>{
    console.log(e);
    const {target:{files}} = e;
    const thefile = files[0] 

    const reader = new FileReader();
   
    reader.onloadend = (finishdedEvent)=>{ 
      const {currentTarget:{result}} = finishdedEvent 
      setAttach(result);

    }
    reader.readAsDataURL(thefile)// 데이타url로 바꿔줌 //이 동작이 실행된후에 reader.onloadend을 읽어드리기 시작함
  }
  

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
      <section className="background" style={{backgroundImage: `url(${aaatt}`}}>
        <h2 className="blind">My profile background image</h2>
        <form onSubmit={onBackSubmit}>
      <input type='file' accept='image/*'onChange={onFile}/>
      <input type='submit' value='Tweet'/>
      </form>
      </section>
      <section className="profile">
        <h2 className="blind">My profile info</h2>
        <div className="profile_img empty" style={{backgroundImage: `url(${attachment}`}}>
        <form onSubmit={onTweetSubmit}>
      <input type='file' accept='image/*' onChange={onFileChange}/>
      <input type='submit' value='Tweet'/>
      </form>
        </div>
        <div className="profile_cont">
          <form onSubmit={onSubmit}>
            <input type='text' onChange={onChange} value={newDisplayName} required/>
            <input type='submit' value='Updata Profile'/>
          </form>
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

export default Myprofile