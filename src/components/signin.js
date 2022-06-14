import React from 'react'
import "../css/signin.css"
import { useNavigate  } from "react-router-dom";

function Signin() {
let navigate = useNavigate();

 function submitClicked(e)
 {
  e.preventDefault();
  if (e.stopPropagation) {   
    e.stopPropagation();
} else {    
    e.cancelBubble = true;
}
  let email = document.getElementsByName("email")[0].value;
  let password = document.getElementsByName("password")[0].value;
  let error = document.getElementById("error-div");
  let ul = document.getElementById("error-ul");
  ul.innerHTML = "";
  let checkEmail = /.*@.*\...*/;
  if(!checkEmail.test(email))
  {
    let li = document.createElement('li');
    li.innerText = "Email address must be like: example@gmail.com";
    ul.appendChild(li);
  }

  if(password.length === 0)
  {
    let li = document.createElement('li');
    li.innerText = "password is required";
    ul.appendChild(li);
  }


  if(ul.children.length === 0)
  {
    fetch("http://localhost:5000/Airbnb/api/signin",{
      method : "POST",
      body : JSON.stringify({email : email, password : password}),
      headers : {'Content-Type': 'application/json'},
        
    })
    .then((response)=>{
     response.json()
     .then((data)=>{
      if(response.status === 201 && data.msg === "user found")
      {
      navigate("/");
      }
      else
      {
        let li = document.createElement('li');
        li.innerText = data.msg;
        ul.appendChild(li);
        console.log(error);
        error.style.display = "block";
        error.style.opacity = 1;
      }
     })
    })
  }
  else
  {
    console.log(error);
    error.style.display = "block";
    error.style.opacity = 1;
  }

 }

  function visibilityClicked(e)
  {
    let password = document.getElementsByName("password")[0];
    let visible = document.getElementById("visibleIcon");
    let invisible = document.getElementById("invisibleIcon");
    if(e.target.id === "visibleIcon")
    {
      visible.style.display = "none";
      invisible.style.display = "inline";
      password.type = "text";
    }
    else
    {
      invisible.style.display = "none";
      visible.style.display = "inline";
      password.type = "password";
    }
  }

  function containerClicked(e)
  {
    
    let error = document.getElementById("error-div");
    if(error.style.display === "block")
    {
      error.style.display = "none";
      error.style.opacity = "0";
    }
  }


  return (
    <div className='signin-container' onClick={containerClicked}>
      <div id='error-div'><ul id='error-ul'></ul></div>
   <div className='signin-form'>
    <label htmlFor='email'>Email Address</label><br/>
    <input name='email' type="email"/><br/>
    <label htmlFor='password'>Password</label><br/>
    <input name='password' type="password" />
    <span id='visibleIcon' onClick={visibilityClicked} style={{display : "inline"}}  class="material-symbols-outlined ">
visibility
  </span>
  <span id='invisibleIcon' onClick={visibilityClicked} style={{display : "none"}} class="material-symbols-outlined">
visibility_off
</span>  
   
    <br/>
    <button type='submit' onClick={submitClicked}>Submit</button>
   </div>
    </div>
  )
}

export default Signin