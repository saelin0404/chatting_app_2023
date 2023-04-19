import React, { useEffect, useState } from 'react'
import '../style/Profile.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import Header from 'component/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck, faComment, faHeart, faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import {async} from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { db , storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL } from "firebase/storage";
import { collection, addDoc , onSnapshot ,query, orderBy , getDocs, deleteDoc} from "firebase/firestore";



function Myprofile({user}) {
  const location = useLocation();
  const navigate = useNavigate();
  if(location === undefined){
    navigate('/');
  }

  const [profileEdit,setProfileEdit] = useState(false);
  const [profileMessage,setProfileMessage] = useState('');
  const [newDisplayName,setNewDisplayName] = useState(user.displayName);
  const [attachmentBack,setAttachmentBack] = useState("");
  const [attachment,setAttachment] = useState(user.photoURL);
  const [Message,setMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, `profile`),
                  orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
        if(newArray.length > 0){
          setAttachmentBack(newArray[0].attachmentBackUrl)
        }
    });
  },[]);

  useEffect(() => {
    const q = query(collection(db, `message`),
                  orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
        if(newArray.length > 0){
          setMessage(newArray[0].text)
        }
    });
  },[]);


  //프로필 변경사항 저장
  const onProfileSubmit = async (e)=>{
    e.preventDefault();
    onSubmitName();
    onSubmitMessage();
    try {
      if(user.photoURL !== attachment){onSubmitProfileImg();}

      let attachmentBackUrl = "";
      if(attachmentBack !== ""){
        const storageBackRef = ref(storage, `${user.uid}/${uuidv4()}`);
        const responseBack = await uploadString(storageBackRef, attachmentBack, 'data_url'); 
        attachmentBackUrl = await getDownloadURL(ref(storage, responseBack.ref))  
      }

      const docRef = await addDoc(collection(db, `profile`),{
        createdAt: Date.now(),
        creatorID: user.uid,
        attachmentBackUrl
      });
    } catch (error) {
      console.log(error.message);
    }
    setProfileEdit(false)
  }

  //프로필이미지 변경
  const onProfileChange = (e)=>{
    console.log(e);
    const {target:{files}} = e;
    const thefile = files[0] 

    const reader = new FileReader();
    
    reader.onloadend = (finishdedEvent)=>{ 
      const {currentTarget:{result}} = finishdedEvent
      setAttachment(result);
    }
    reader.readAsDataURL(thefile)
  }

  const onSubmitProfileImg = async()=>{
    let attachmentUrl = "";
      const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url'); 
      attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      await updateProfile(user,{photoURL:attachmentUrl})
  }

  //백그라운드 이미지 변경
  const onChangeBackground = (e)=>{
    const {target:{files}} = e;
    const thefile = files[0] 

    const reader = new FileReader();
    
    reader.onloadend = (finishdedEvent)=>{ 
      const {currentTarget:{result}} = finishdedEvent
      setAttachmentBack(result);
    }
    reader.readAsDataURL(thefile)
  }

  //기본이미지로 변경
  const onDeletprofileImg = async(e)=>{
    e.preventDefault();
    const ok = window.confirm("기본이미지로 변경하시겠습니까?")
    if(ok){
      await updateProfile(user,{photoURL:""})
      setAttachment(null)
    }
  }

  const onDeletBackground = async() =>{
    const ok = window.confirm("기본이미지로 변경")
    setAttachmentBack("")
    const querySnapshot = await getDocs(collection(db, "profile"));
    if(ok){
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
        setAttachmentBack("")
      });
    }
  }

  //상태메세지 입력
  const onChangeMessage=(e)=>{
    e.preventDefault();
    const{target:{value}} = e;
    setProfileMessage(value)
  }

  const onSubmitMessage = async (e)=>{
    try {
      const docRef = await addDoc(collection(db,`message`),{
        text:profileMessage,
        createdAt: Date.now(),
        creatorID: user.uid,
      });
    } catch (error) {
      console.log(error.message);
    }
  }


  //사용자 이름변경
  const onChangeName = (e)=>{
    const{target:{value}} = e;
    setNewDisplayName(value)
  }

  //이름 저장
  const onSubmitName = async(e)=>{
    if(user.displayName !== newDisplayName){
      await updateProfile(user,{displayName:newDisplayName})
    }
  }

  return (
    <div className='profiles'>
      <header className='main'>
        <Header
          h1 = {""}
          spanH1={""}
          leftItem={<FontAwesomeIcon icon={faXmark}/>}
          rightItem={profileEdit && <button className='remove' onClick={onDeletBackground}><FontAwesomeIcon icon={faTrash}/></button>}
        />
      </header>
      {profileEdit ? (
        <main className='main'>
          <section className="backgroundProfile" style={attachmentBack ? {backgroundImage: `url(${attachmentBack})`} : {}}>
            <h2 className='blind'>My profile background image</h2>
          </section>
          <section className='profile'>
            <h2 className='blind'>My Profoile info</h2>
            <div className='profile_img empty' style={attachment ? {backgroundImage: `url(${attachment})`} : {}}></div>
            <form className='profile_content' onSubmit={onProfileSubmit}>
              <input type='text' className='profile_name' onChange={onChangeName} value={newDisplayName} required/>
              <input type='text' className='profile_message' onChange={onChangeMessage} value={profileMessage}/>

              <label htmlFor='back_img' className='profile_img_up back'>
                <FontAwesomeIcon icon={faCamera}/>
              </label>
              <input type='file' id='back_img' accept='image/*' style={{display:'none'}} onChange={onChangeBackground}/>

              <label htmlFor='img' className='profile_img_up'>
                <FontAwesomeIcon icon={faCamera}/>
              </label>
              <input type='file' id='img' accept='image/*' style={{display:'none'}} onChange={onProfileChange}/>
              <ul className='profile_menu edit'>
                <li>
                  <label htmlFor='update' className='profile_update'>
                    <FontAwesomeIcon icon={faCheck}/>
                    <span>Update</span>
                  </label> 
                  <input type='submit' id='update' style={{display:'none'}}/>
                </li>
                <li onClick={()=>{setProfileEdit(false)}}>
                  <FontAwesomeIcon icon={faXmark}/>
                  <span>Cancle</span>
                </li>
              </ul>
            </form>
            <button className='remove' onClick={onDeletprofileImg}><FontAwesomeIcon icon={faTrash}/></button>
          </section>
        </main>
      ):(
        <main className='main' >
          <section className="backgroundProfile" style={attachmentBack ? {backgroundImage: `url(${attachmentBack})`} : {}}>
            <h2 className='blind'>My profile background image</h2>
          </section>
          <section className='profile' >
            <h2 className='blind'>My Profoile info</h2>
            <div className='profile_img empty' style={attachment ? {backgroundImage: `url(${attachment})`} : {}}></div>
            <div className='profile_content'>
                <span className='profile_name'>{user.displayName}</span>
                <span className='profile_email'>{user.email}</span>
                <span className='profile_message'>{Message}</span>
              </div>
              <ul className='profile_menu'>
                <li><span><FontAwesomeIcon icon={faComment}/></span>My Chatting</li>
                <li><span><FontAwesomeIcon icon={faPencil} onClick={()=>{setProfileEdit(true)}}/></span>Edit Profile</li>
                <li><span><FontAwesomeIcon icon={faHeart}/></span>Story</li>
              </ul>
          </section>
        </main>
      )}
    </div>
  )
}

export default Myprofile