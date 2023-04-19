import React, { useEffect, useState } from 'react'
import 'style/Story.scss'
import Header from 'component/Header'
import Tab from 'component/Tab'
import Today from "component/Today";
import { collection, query, where, onSnapshot ,orderBy ,addDoc} from "firebase/firestore";
import { db , storage } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadString ,getDownloadURL } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceMeh } from '@fortawesome/free-regular-svg-icons'
import { faAngleLeft, faCloud, faPaperPlane, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'


function Story({user}) {
  console.log(user);
  const [today,setToday] = useState("");
  const [attachment,setAttachment] = useState("");
  const [storyMy,setStoryMy] = useState(false);
  const[todays,setTodays] = useState([])
  const[todayMy,setTodayMy] = useState([])

  useEffect(()=>{
    const q = query(collection(db, "todays"), orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id});
      });
      setTodays(newArray);
    });
  },[])

  useEffect(()=>{
    // getTeets();
    const q = query(collection(db, "todays"),where("creatorID","==",user.uid),
     orderBy('createdAt','desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id})
      });
      setTodayMy(newArray);
    });
  },[])

  const onFileChange = (e)=>{
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

  const onChange = e=>{
    e.preventDefault();
    const {target:{value}} = e;
    setToday(value)
  }

  const onSubmit = async (e)=>{
    e.preventDefault();
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage, `${user.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url');
        attachmentUrl = await getDownloadURL(ref(storage, response.ref)) 
      }
      const docRef = await addDoc(collection(db, "todays"), {
        first: today,
        createdAt: Date.now(),
        creatorID: user.uid,
        attachmentUrl
      });
      console.log(docRef);
    } catch (e) {
      console.error(e)
    }
    setToday("");
    setAttachment("")
  }

  const onclearAttachment = ()=>{
    setAttachment("");
  }

  return (
    <div className='story'>
      <div className='background'></div>
      <header className='main'>
        <Header
        h1 = {'Stroy'}
        spanH1={""}
        leftItem={<FontAwesomeIcon icon={faAngleLeft}/>}
        rightItem={""}/>
      </header>
      <main className='main'>
        <div className='today_weather'>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCloud} />
              <span>흐림</span>
              </li>
            <li><span>24</span>.5º</li>
            <li>
              <FontAwesomeIcon icon={faFaceMeh} />
              <span>미세먼지</span>
              <span>보통</span>
            </li>
          </ul>
        </div>
        <div className='story_form'>
          <ul>
            <li className={`${!storyMy && "on"}`} onClick={()=>setStoryMy(false)}>Story</li>
            <li className={`${storyMy && "on"}`} onClick={()=>setStoryMy(true)}>My Story</li>
          </ul>
          <form onSubmit={onSubmit}>
            <fieldset>
              <input type='text' placeholder="What's on your mind" value={today} maxLength={120} onChange={onChange}/>
              <label htmlFor='submit' className='submit'>
                <FontAwesomeIcon icon={faPaperPlane}/>
              </label>
              <input type='submit' id='submit' style={{display:'none'}}/>
              <label htmlFor='attach' className='attachment'>
                <FontAwesomeIcon icon={faPlus}/>
              </label>
              <input type='file' accept='image/*' id='attach' style={{display:'none'}} onChange={onFileChange}/>
            </fieldset>
          </form>
          {attachment && (
            <div className='img'>
              <img src={attachment} alt='' />
              <div className='clear_attachment' onClick={onclearAttachment}>
                <FontAwesomeIcon icon={faXmark}/>
              </div>
            </div>
          )}
        </div>
        {!storyMy ?(
          <div className='storys'>
            {todays.map(to =>(
              <Today toObj={to}  isOwner={to.creatorID === user.uid}/>
            ))}
          </div>
        ):(
          <div className='storys'>
            {todayMy.map(to =>(
              <Today toObj={to}  isOwner={to.creatorID === user.uid}/>
            ))}
          </div>
        )}
      </main>
      <Tab/>
    </div>
  )
}

export default Story