import React, { useEffect, useState } from 'react'
import { doc, deleteDoc ,updateDoc} from "firebase/firestore";
import { db ,storage } from 'fbase';
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencil, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

function Today(props) {
  console.log(props);
  const {toObj:{first,id,attachmentUrl,createdAt},isOwner} = props
  const [editing,setEditng] = useState(false);
  const[newToday,setNewToday] = useState(first);
  const[nowDate,setNowDate] = useState()
  
  const onDeletclick = async() =>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "todays", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef)
      }
    }
  }

  const toggleEditing = ()=>setEditng((prev)=>!prev);
  const onChange = (e)=>{
    const {target:{value}} = e;
    setNewToday(value)
  }

  const onSubmit = async(e)=>{
    e.preventDefault();
    const newTweetRef = doc(db, 'todays', `/${id}`);


   await updateDoc(newTweetRef, {
     first:newToday,
     createdAt :Date.now(),
    });
    setEditng(false);
  }
  useEffect(()=>{
    let timestamp = createdAt
    const now = new Date(timestamp);
    setNowDate(now.toDateString())
  },[])
  
  return (
    <div className='story'>
      {editing? (
        <>
        <form onSubmit={onSubmit} className='edit'>
          <input type='text' onChange={onChange} value={newToday} required className='fromInput'/>
          <label htmlFor='Update'>
            <FontAwesomeIcon icon={faCheck}/>
          </label>
          <input type='submit' id='Update' className='formBtn' style={{display:'none'}}/>
        </form>
        <button onClick={toggleEditing} className='cancelBtn'><FontAwesomeIcon icon={faXmark} /></button>
        </>
      ):(
        <>
        <h4>{first}</h4>
        {attachmentUrl && <img src={attachmentUrl} width='50' height= '50' alt=''/>}
        <span className='time'>{nowDate}</span>
        {isOwner &&(
          <div className='story_edit'>
            <span onClick={onDeletclick}><FontAwesomeIcon icon={faTrash}/></span>
            <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencil}/></span>
          </div>
        )}
        </>
      )}
  </div>
  )
}

export default Today