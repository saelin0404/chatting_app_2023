import React from 'react'
import Header from '../component/Header'
import Tab from '../component/Tab'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook,faQrcode,faMobileScreenButton,} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope} from "@fortawesome/free-regular-svg-icons";
import '../style/Find.scss';


function Find(){
  return (
    <>
    <header className='main'>
    <Header 
      h1 = {'Find'}
      spanH = {''}
      left = {'Edit'}
      right = {' '}
    />
    </header>
    <main className='main'>
    <ul className="find_method">
      <li><a><FontAwesomeIcon icon={faAddressBook}/>Find</a></li>
      <li><a><FontAwesomeIcon icon={faQrcode}/>OR</a></li>
      <li><a><FontAwesomeIcon icon={faMobileScreenButton}/>Shake</a></li>
      <li><a><FontAwesomeIcon icon={faEnvelope}/>Invite via SNS</a></li>
    </ul>
    <section className="recommend_section">
      <header><h2>Recommend Friends</h2></header>
      <ul>
        <li>You Have no recommended friends.</li>
      </ul>
    </section>
    </main>
    <Tab />
    </>
  )
}

export default Find