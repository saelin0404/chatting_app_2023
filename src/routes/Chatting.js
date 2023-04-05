import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { Link, useLocation,useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faBars, faMagnifyingGlass, faMicrophone, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import '../style/Chatting.scss'
import { collection, addDoc, query, onSnapshot ,orderBy } from "firebase/firestore";
import { db ,storage } from 'fbase';
import { ref, uploadString ,getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Chats from 'component/Chats';



function Chatting({userObj}) {
  const header_right = 
  <span>
    <FontAwesomeIcon icon={faMagnifyingGlass}/>
    <FontAwesomeIcon icon={faBars}/>
  </span>

  const location = useLocation();
  const {profileMesg,username,message,userimg,backimg,email} = location.state;

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/chat');
  }

  const messages = message.map((list,index)=>{
    return <span key={index} className="chat">{list}</span>
  })

  const [chats,setChats] = useState([]);
  const[chat,setChat] = useState("");
  const [attachment,setAttachment] = useState("");

  useEffect(()=>{//비동기함수 실행
    // getTeets();
    const q = query(collection(db, "chatting"), orderBy('createdAt',"asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
          newArray.push({...doc.data(),id:doc.id});
      });
      setChats(newArray)
    });
  },[])

  const onChat = (e)=>{
    const {target:{value}}=e;
    setChat(value)
  }

  const onChatSumit = async(e)=>{
    e.preventDefault();
    
    try {
      let attachmentUrl = "";
      if(attachment !== ""){
        const storageRef = ref(storage,`${userObj.uid}/${uuidv4()}`);
        const response = await uploadString(storageRef, attachment, 'data_url')
        attachmentUrl = await getDownloadURL(ref(storage, response.ref))
      }

      const docRef = await addDoc(collection(db, "chatting"), {
        first: chat,
        createdAt:Date.now(),
        creatorID: userObj.uid,
        attachmentUrl
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setChat('');
    setAttachment("")
  }
  const onFileChange = (e)=>{
    const {target:{files}} = e;
    const thefile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finish)=>{
      const{currentTarget:{result}} = finish
      setAttachment(result)
    }
    reader.readAsDataURL(thefile)
  }
  
  const onclearAttachment = (e) =>{
    e.preventDefault();
    setAttachment("");
  }

  return (
    <>
    <header className='main chatting'>
    <Header
      h1 = {username}
      spanH = {''}
      left = {<FontAwesomeIcon icon={faAngleLeft}/>}
      right = {header_right} 
    />
    </header>

    <main className='chatting'>
      <span className="date_info">Thursday,March 23,2023</span>
      <div className="chat_box my">
        {messages}
        <span className="chat_time"><span>15</span>: <span>33</span></span>
      </div>
      <div className="chat_box other">
        <div classNames="other_info">
        <Link to={'/profile'} state={{profileMesg,username,message,userimg,backimg,email}}>
          <span class="profile_img empty" style={{backgroundImage: `url(${userimg}`}}></span>
        </Link>
          <span className="profile_name">{username}</span>
        </div>
        {messages}
        <span className="chat_time"><span>15</span>: <span>33</span></span>
      </div>
      <>
        {chats.map(chat =>(
        <Chats key={chat.id} chatObj={chat} isOwner={chat.creatorID === userObj.uid} state ={{userimg,username}}/>//현재 로그인한 사용자 정보와 트위을 쓴 사람의 정보와 같을때(내가 쓴 트윗)
        ))}
      </>
    </main>
    <footer>
      <span className="plus_btn"><a><FontAwesomeIcon icon={faPlus}/></a></span>
      <form action="/" method="post" onSubmit={onChatSumit}>
        <fieldset className="text_box">
          <legend className="blind">채팅 입력창</legend>
          <label for="chatting" class="blind">채팅입력</label>
          <input type="text" id="chatting" className="text_field" value={chat} onChange={onChat}/>
          <input type='file' accept='image/*' onChange={onFileChange}/>
          <input type='submit' value='전송'/>
          {attachment && (
          <div>
            <img src={attachment} width="50" height="50" alt=''/>
            <button onClick={onclearAttachment}>remove</button>
          </div>
        )}
          <span className="emoticon_btn"><a><FontAwesomeIcon icon={faFaceSmile}/></a></span>
          <span className="voice_btn"><a><FontAwesomeIcon icon={faMicrophone}/></a></span>
        </fieldset>
      </form>
    </footer>
    </>
  )
}

export default Chatting