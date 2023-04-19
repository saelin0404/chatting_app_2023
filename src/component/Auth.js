import React, { useState } from 'react'
import 'style/Auth.scss';
import {authService} from 'fbase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth";
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

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
    <div className='auth'>
    <div className='background'></div>
    <header className='main'>
      <Header />
    </header>
    <div className='log'>
      <div className='logo'>
        <span className='logo_left'>[</span>
        <span className='logo_text'><span>Chatting...</span></span>
        <span className='logo_right'>]</span>
      </div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <input type='email' placeholder='EMail' required name='email' 
            onChange={onChange} value={email}/>
          <input type='password' placeholder='PASSWORD' required name='password'
            onChange={onChange} value={password}/>
          <input type='submit' value={newAccount ? 'Create Account':'Log In'}/>
        </fieldset>
      </form>
      <span>
        <span></span>
        <span onClick={toggleAccount}>{newAccount? "Log In" : 'Create Account'}</span>
        <span></span>
      </span>
      
      <div className='sns'>
        <button name='google'><FontAwesomeIcon icon={faGoogle}/></button>
        <button name='github'><FontAwesomeIcon icon={faGithub}/></button>
      </div>
    </div>
  </div>
  )
}

export default Auth