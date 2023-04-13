import { faAngleLeft, faBagShopping, faShop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from 'component/Header'
import Tab from 'component/Tab'
import React from 'react'
import { Link } from 'react-router-dom'

function Shopping() {
  return (
    <div className='shopping'>
      <header className='main'>
        <Header
        h1 = {'Shop'}
        spanH1={<FontAwesomeIcon icon={faBagShopping}/>}
        leftItem={<FontAwesomeIcon icon={faAngleLeft}/>}
        rightItem={""}/>
      </header>
      <Tab/>
    </div>
  )
}

export default Shopping