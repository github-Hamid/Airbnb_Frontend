import React from 'react'
import "../css/header.css"
function Header() {
  return (
      <div className='div-img'>
    <img className='logoImage' src={process.env.PUBLIC_URL + "/images.png"} alt='Airbnb'/>
    </div>
  )
}

export default Header