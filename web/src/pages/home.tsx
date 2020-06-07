import React from 'react'
import { FiLogIn } from 'react-icons/fi'

import './home.css'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

const Home = () => {
  function generateNonSense(){
    let teste = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);
    teste = teste + Math.floor(1000 + (9999 - 1000) * Math.random());
    window.open('http://prnt.sc/'+teste);
  }

  return (
    <div id='page-home'>
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>
        <main>
          <h1>Seu marketplace de coleta de resíduos</h1>
          <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

          <a onClick={generateNonSense}>
            <span><FiLogIn /></span>
            <strong>Cadastre um ponto de coleta</strong>
          </a>
        </main>
      </div>
    </div>
  )
}

export default Home
