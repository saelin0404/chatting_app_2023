import React, { useState } from 'react'
import {authService} from 'fbase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";

function Auth() {
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const[error,setError] = useState('');
  const[newAccount,setNewAccount] = useState(true);

  //이메일,비밀번호입력
  const onChange = e =>{
    const {target:{name,value}} = e;
    console.log(e);
    if(name === 'email'){
      setEmail(value)
    }else if(name === 'password'){
      setPassword(value)
    }
  }

  //회원가입 및 로그인
  const onSubmit = async(e)=>{
    e.preventDefault();
    let data;
    try{
      if(newAccount){
        data =await createUserWithEmailAndPassword(authService, email, password)
      }else{
        data =await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data);
    }catch(error){
      console.log(error);
      setError(error.message)
    }
  }

  //로그인/회원가입 전환
  const toggleAccount = ()=>{setNewAccount(prev => !prev)}


  return (
    <main className='auth_main'>
      <div>
        <form onSubmit={onSubmit}>
          <input type='email' placeholder='EMail' required name='email' 
            onChange={onChange} value={email}/>
          <input type='password' placeholder='PASSWORD' required name='password'
            onChange={onChange} value={password}/>
          <input type='submit' value={newAccount ? '회원가입':'로그인'}/>
        </form>
        <span onClick={toggleAccount}>{newAccount? "로그인 하기" : '회원가입 하기'}</span>
        <div>
          <span>SNS로 로그인</span>
          <button name='google'></button>
          <button name='github'></button>
        </div>
      </div>
    </main>
  )
}

export default Auth