import React from 'react'
import 'style/Chat.scss'
import Chat from 'component/Chat'
import Header from 'component/Header'
import Tab from 'component/Tab'
import datas from 'data/users.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'


function Chats() {
  return (
    <div className='chats'>
      <header className='main'>
        <Header
        h1 = {'chats'}
        spanH1={""}
        leftItem={<FontAwesomeIcon icon={faAngleLeft}/>}
        rightItem={""}/>
      </header>
      <main className='main'>
        <section className='main_section'>
          <header><h2 className='blind'>Chatting list</h2></header>
          <ul>
            {datas.map(user=><Chat friendData={user}/>)}
          </ul>
        </section>
      </main>
      <Tab />
    </div>
  )
}

export default Chats