import React from 'react'
import "../css/signup.css"
import { useNavigate  } from "react-router-dom";
function Signup() {
  
  let navigate = useNavigate();

  function submitClicked(e)
  {
    e.preventDefault();
    if (e.stopPropagation) {   
      e.stopPropagation();
  } else {    
      e.cancelBubble = true;
}
     let fname = document.getElementsByName("fName")[0].value;
     let lname = document.getElementsByName('lName')[0].value;
     let email = document.getElementsByName("email")[0].value;
     let password = document.getElementsByName("password")[0].value;
     let error = document.getElementById("error-div");
     let ul = document.getElementById("error-ul");
     ul.innerHTML = "";
     let checkEmail = /.*@.*\...*/;
     let checkPassword1 = /.*[1-9].*/;
     let checkPassword2 = /.*[a-z].*/;
     let checkPassword3 = /.*[A-Z].*/;
     let checkPassword4 = /.*[@#\$\%\^&\*\.!].*/
     console.log(fname + " " + lname + " " + email + " " + password);
     if(fname.length < 3 || lname.length < 3)
     {
      let li = document.createElement('li');
      li.innerText = "First name and Last name are required with at least 3 characters!";
      ul.appendChild(li);
     }
     if(!checkEmail.test(email))
     {
      let li = document.createElement('li');
      li.innerText = "Email address must be like: example@gmail.com";
      ul.appendChild(li);
     }
          
     if(password.length < 6 || !checkPassword1.test(password) || !checkPassword2.test(password)
    || !checkPassword3.test(password) || !checkPassword4.test(password))
    {
      let li = document.createElement('li');
      li.innerText = "password must be at least 6 characters with 1 lowercase, 1 uppercase, 1 digit and 1 special character";
      ul.appendChild(li);
    }

     if(ul.children.length !== 0)
     {
      console.log(error);
         error.style.display = "block";
         error.style.opacity = 1;
     }
     else 
     {
      fetch("https://stark-crag-59840.herokuapp.com/Airbnb/api/signup",{
        method : "POST",
        body : JSON.stringify({fname : fname, lname : lname, email : email, password : password}),
        headers : {'Content-Type': 'application/json'}, 
      })
      .then((response)=>{
        response.json()
        .then((data)=>{
          navigate("/");
        })
      })
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


  return (
    <div className='signup-container' onClick={containerClicked}>
      <div id='error-div'><ul id='error-ul'></ul></div>
   <div className='signup-form'>
    <div>
      <div>
      <label>First Name</label><br/>
      <input name='fName' type="text"/><br/>
      </div>
      <div>
      <label>Last Name</label><br/>
      <input name='lName' type="text"/>
      </div>
    </div>
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

export default Signup