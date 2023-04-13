import React, { useEffect, useState } from 'react'
import '../style/Profile.scss'
import {async} from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { db , storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL } from "firebase/storage";
import { collection, addDoc , onSnapshot ,query, orderBy , getDocs, deleteDoc,where, updateDoc} from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck, faComment, faPencil, faTrash, faUser, faXmark } from '@fortawesome/free-solid-svg-icons';
import Header from 'component/Header';


function Myprofile({user}){
  const[newDisplayName,setNewDisplayName] = useState(user.displayName);
  const[attachment,setAttachment] = useState(user.photoURL);
  const[attachmentBack,setAttachmentBack] = useState('');
  const[profileEdit,setProfileEdit] = useState(false);
  const[profileMessage,setProfileMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, 'profile'),
                where("creatorID","==",user.uid),
                  orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      if (newArray.length > 0) {
        setAttachmentBack(newArray[0].attachmentBackUrl)
      }
    });
    setAttachment(user.photoURL)
  },[profileEdit]);
  

  //프로필사진변경
  const onProfileSubmit = async (e)=>{
    e.preventDefault();
    onNameSubmit();
    try {
      if(attachment !== "" || attachment !== null){userPhotoUrlUp();}
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

  const userPhotoUrlUp = async()=>{
    let attachmentUrl = "";
      const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url'); 
      attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      await updateProfile(user,{photoURL:attachmentUrl})
  }


  //프로필이미지 파일 업로드
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
  
  //백그라운드 이미지 업로드
  const onProfileBackChange = (e)=>{
    console.log(e);
    const {target:{files}} = e;
    const thefile = files[0] 

    const reader = new FileReader();
    
    reader.onloadend = (finishdedEvent)=>{ 
      const {currentTarget:{result}} = finishdedEvent
      setAttachmentBack(result);
      console.log(setAttachmentBack);
    }
    reader.readAsDataURL(thefile)
  }

  //이름 변경
  const onNameChange = (e)=>{
    const{target:{value}} = e;
    setNewDisplayName(value)
  }

  //이름 저장
  const onNameSubmit = async(e)=>{
    if(user.displayName !== newDisplayName){
      await updateProfile(user,{displayName:newDisplayName})
    }
  }
  
  //삭제
  const onDeletclick = async() =>{
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

  const onProfileDelet = async(e)=>{
    e.preventDefault();
    const ok = window.confirm("기본이미지로 변경")
    if(ok){
      await updateProfile(user,{photoURL:""})
      setAttachment(null)
    }
  }


  return (
    <div className='profiles'>
      <header className='main'>
        <Header
          h1 = {""}
          spanH1={""}
          leftItem={<FontAwesomeIcon icon={faXmark}/>}
          rightItem={profileEdit && <button className='remove back' onClick={onDeletclick}><FontAwesomeIcon icon={faTrash}/></button>}
        />
      </header>
      <main className='main'>
        <section className="background" style={attachmentBack ? {backgroundImage: `url(${attachmentBack})`} : {}}>
          <h2 className='blind'>My profile background image</h2>
        </section>

        <section className='profile'>
          <h2 className='blind'>My Profoile info</h2>
          <div className='profile_img empty' style={attachment ? {backgroundImage: `url(${attachment})`} : {}}></div>
          {!profileEdit ? (
            <>
            <div className='profile_content'>
              <span className='profile_name'>{newDisplayName}</span>
              <span className='profile_email'>{user.email}</span>
              <span className='profile_message'>{profileMessage}</span>
            </div>
            <ul className='profile_menu'>
              <li><span><FontAwesomeIcon icon={faComment}/></span>My Chatting</li>
              <li><span><FontAwesomeIcon icon={faPencil} onClick={()=>{setProfileEdit(true)}}/></span>Edit Profile</li>
              <li><span><FontAwesomeIcon icon={faUser}/></span>Story</li>
            </ul>
            </>
          ):(
            <>
            <form className='profile_content' onSubmit={onProfileSubmit}>
              <input className='profile_name' type='text' onChange={onNameChange} value={newDisplayName} required placeholder='My Name'/>
              <label htmlFor='back_img' className='profile_img_up back'>
                <FontAwesomeIcon icon={faCamera}/>
              </label>
              <input type='file' id='back_img' accept='image/*' style={{display:'none'}} onChange={onProfileBackChange}/>
              <label htmlFor='img' className='profile_img_up'>
                <FontAwesomeIcon icon={faCamera}/>
              </label>    
              <input type='file' id='img' accept='image/*' style={{display:'none'}} onChange={onProfileChange}/>
              <label htmlFor='update' className='profile_update'>
                <FontAwesomeIcon icon={faCheck}/>
                <span>Update</span>
              </label> 
              <input type='submit' id='update' style={{display:'none'}}/>
            </form>
            <button className='remove' onClick={onProfileDelet}><FontAwesomeIcon icon={faTrash}/></button>
            </>
          )}
        </section>
      </main>
    </div>
  )
}

export default Myprofile