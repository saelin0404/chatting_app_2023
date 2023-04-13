import React, { useState } from 'react'
import 'style/Chatting.scss'
import { Link } from 'react-router-dom';
import { db ,storage } from 'fbase';
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';


function Chatting(props){
  const {chatObj:{first,id,attachmentUrl},isOwner,state:{email,images,userimg,message,name,profile_message}} = props
  const [editing,setEditng] = useState();
  const [newChatting,setNewChatting] = useState(first);
  const [editChattung,setEditChatting] = useState(false);

  //삭제
  const onDeletclick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "chatting", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef)
      }
    }
  }

  //수정
  const toggleEditing = ()=>setEditng((prev)=>!prev);

  //수정한 글
  const onChange = (e)=>{
    const {target:{value}} = e;
    setNewChatting(value)
  }

  //수정 완료
  const onSubmit = async(e)=>{
    e.preventDefault();
    const newTweetRef = doc(db, 'chatting', `/${id}`);

   await updateDoc(newTweetRef, {
     first:newChatting,
    });
    setEditng(false);
  }

  return (
    <>
      {editing? (
        <>
          <form className='chatting_edit' onSubmit={onSubmit}>
            <input className='new_chatting' type='text' onChange={onChange} value={newChatting} required/>
            <input className='new_submit' type='submit' value='Updata Tweet'/>
          </form>
          <button className='cancle' onClick={toggleEditing}>Cancel</button>
        </>
      ):(
      <>
        {isOwner ?(
          <div className="chat_box my" onClick={()=> setEditChatting(true)}>
            <span className='chat' key={id}>{first}{attachmentUrl && <img src={attachmentUrl} alt=''/>}</span>
            {editChattung && 
              <>
                <button className='btn delet' onClick={onDeletclick}><FontAwesomeIcon icon={faXmark}/></button>
                <button className='btn edit' onClick={toggleEditing}><FontAwesomeIcon icon={faPencil}/></button>
              </>
            }
            <span className="chat_time"><span>15</span> : <span>33</span></span>
          </div>
        ):(
          <div className="chat_box other">
            <Link to={'/friend'} state={{email,images,userimg,message,name,profile_message}}>
            <span className='profile_img empty' style={{backgroundImage: `url(${userimg}`}}></span>
            </Link>
            <span className='profile_name'>{name}</span>
            <span className='chat' key={id}>{first}{attachmentUrl && <img src={attachmentUrl} alt=''/>}</span>
            <span className="chat_time"><span>15</span> : <span>33</span></span>
          </div>
        )}
      </>
      )}
    </>
  )
}

export default Chatting