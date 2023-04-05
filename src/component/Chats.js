import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { db ,storage } from 'fbase';
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

function Chats(props) {
  console.log(props);
  const {chatObj:{first,id,attachmentUrl},isOwner,state:{userimg,username}} = props
  const [editing,setEditng] = useState();
  const[newChatting,setNewChatting] = useState(first);

  const onDeletclick = async() =>{
    const ok = window.confirm("쫄?")
    if(ok){
      const data = await deleteDoc(doc(db, "chatting", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef)
      }
    }
  }
  const toggleEditing = ()=>setEditng((prev)=>!prev);
  const onChange = (e)=>{
    const {target:{value}} = e;
    setNewChatting(value)
  }

  const onSubmit = async(e)=>{
    e.preventDefault();
    const newTweetRef = doc(db, 'chatting', `/${id}`);

   await updateDoc(newTweetRef, {
     first:newChatting,
     createdAt :Date.now(),
    });
    setEditng(false);
  }

  return (
    <>
    {editing? (
      <>
      <form onSubmit={onSubmit}>
        <input type='text' onChange={onChange} value={newChatting} required/>
        <input type='submit' value='Updata Tweet'/>
      </form>
      <button onClick={toggleEditing}>Cancel</button>
      </>
    ):(
      <>
      {isOwner ?(
        <div className="chat_box my">
          <span key={id} className="chat">
            {first}
            {attachmentUrl && <img src={attachmentUrl} alt=''/>}
            </span>
          <button onClick={onDeletclick}>Delet Tweet</button>
          <button onClick={toggleEditing}>Edit Tweet</button>
          <span className="chat_time"><span>15</span> : <span>33</span></span>
        </div>
      ):(
        <div className="chat_box other">
        <div classNames="other_info">
        <Link to={'/profile'}>
          <span class="profile_img empty" style={{backgroundImage: `url(${userimg}`}}></span>
        </Link>
          <span className="profile_name">{username}</span>
        </div>
        <span key={id} className="chat">{first}</span>
        <span className="chat_time"><span>15</span> : <span>33</span></span>
        </div>
      )}

      </>
          )}
    </>
  )
}

export default Chats