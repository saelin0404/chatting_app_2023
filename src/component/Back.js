import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faComment, faPencil, faUser } from "@fortawesome/free-solid-svg-icons";
import '../style/Profile.scss'
import {async} from '@firebase/util'
import { updateProfile } from 'firebase/auth'
import { collection, addDoc , onSnapshot ,query, orderBy ,doc, getDocs, deleteDoc,where} from "firebase/firestore";
import { db , storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL,getStorage, refFromURL ,deleteObject} from "firebase/storage";

function Back({userObj}) {
  const[attach,setAttach] = useState(""); //빈문자열

  useEffect(() => {
    const q = query(collection(db, 'profile'),
    where("creatorID","==",userObj.uid),
    orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({ ...doc.data(), id: doc.id });
      });
      if (newArray.length > 0) {
        setAttach(newArray[0].attachmentUrl);
      }
    });
      },[userObj]);


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

  const onBackSubmit = async (e)=>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
        const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attach, 'data_url'); 
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))
        
    const docRef = await addDoc(collection(db, `profile`),{
      createdAt: Date.now(),
      creatorID: userObj.uid,
      attachmentUrl
    });
    } catch (e) {
      console.error(e)
    }
  }
  const onDeletclick = async() =>{
    const ok = window.confirm("쫄?")//창 띄우기
    const querySnapshot = await getDocs(collection(db, "profile"));
    if(ok){
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
    setAttach("")
  }

  return (
    <>
    {attach !== "" ?(
        <section className="background" style={{backgroundImage: `url(${attach}`}}>
        <h2 className="blind">My profile background image</h2>
        <form onSubmit={onBackSubmit}>
          <input type='file' accept='image/*' onChange={onFile}/>
          <input type='submit' value='Tweet'/>
        </form>
        <button onClick={onDeletclick} style={{marginTop:200}}>reerre</button>
      </section>
    ):(
      <section className="background">
      <h2 className="blind">My profile background image</h2>
      <form onSubmit={onBackSubmit}>
        <input type='file' accept='image/*' onChange={onFile}/>
        <input type='submit' value='Tweet'/>
      </form>
      <button onClick={onDeletclick} style={{marginTop:200}}>reerre</button>
    </section>
    )}
    </>
  )
}

export default Back