import React from 'react'
import "../css/header.css"
function Header() {
function menuClicked(){
let close = document.getElementById("closeIcon");
let menu = document.getElementById("menuIcon");
if(close.classList.contains("hidden"))
{
  menu.classList.remove("show");
menu.classList.add("hidden");
close.classList.remove("hidden");
close.classList.add("show");
}
else
{
  close.classList.remove("show");
  close.classList.add("hidden");
menu.classList.remove("hidden");
menu.classList.add("show");
}
}

  return (
      <div className='header_div'>
    <img className='header_div__img' src={process.env.PUBLIC_URL + "/images.png"} alt='Airbnb'/>
    <div className='header_div__div_menu' onClick={menuClicked}>
    <span id='menuIcon' className="material-symbols-outlined">
menu
</span>
<span id='closeIcon' className="material-symbols-outlined hidden">
close
</span>
<div className='header_div__div_menu__div_items'>
  <ul>
    <li><a href="/signup">SignUp</a></li>
    <li><a href="/signin">SignIn</a></li>
    <li><a href="/">Home</a></li>
  </ul>
</div>
    </div>
    
    </div>
  )
}

export default Header