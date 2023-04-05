import React, { useState } from 'react'
import {authService} from 'fbase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,GithubAuthProvider} from "firebase/auth";
import Header from './Header';
import '../style/Auth.scss'


function Auth() {
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const[newAccount,setNewAccount] = useState(true);
  const[error,setError] = useState('');

  const onChange = e =>{
    const {target:{name,value}} = e;
    console.log(e);
    if(name === 'email'){
      setEmail(value)
    }else if(name === 'password'){
      setPassword(value)
    }
  }

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

  const toggleAccount = ()=>{setNewAccount(prev => !prev)}

  const onsocialClick = async (e) =>{
    console.log('e.target.name->',e.target.name);
    const {target:{name}} = e;
    let provider;
    if(name === 'google'){
      provider = new GoogleAuthProvider();

    }else if(name === 'github'){
      provider =new GithubAuthProvider();
    }
    const data = signInWithPopup(authService, provider)
    console.log(data);
  }

  return (
    <>
    <header className='auth_header'>
    <Header/>
    </header>

    <main className='auth_main'>
    <div className='login'>
      <form onSubmit={onSubmit}>
        <input type='email' placeholder='email' required name='email' 
          onChange={onChange} value={email}/>
        <input type='password' placeholder='password' required name='password'
          onChange={onChange} value={password}/>
        <input type='submit' value={newAccount ? 'Create Account':'Log In'}/>
      </form>
      <span onClick={toggleAccount}>
        {newAccount? "Sign In" : 'Create Account'}
      </span>
      <div>
        <button name='google' onClick={onsocialClick}>Continue with Google</button>
        <button name='github' onClick={onsocialClick}>Continue with GitHub</button>
      </div>
    </div>
    <div></div>
    </main>
    </>
  )
}

export default Auth