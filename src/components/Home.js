import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Card from "./Card"
import "../css/home.css"
import { settings } from "../slider_config";
import DetailedCard from './DetailedCard';

async function getListByPrice_type(price, type)
{
  const response = await fetch(`http://localhost:5000/Airbnb/api/price&type?price=${price}&type=${type}`);
  const data = await response.json();
  console.log("data:", data);
  if(response.status === 200)
  return data;
 
}

async function getListByPrice(price)
{
  const response = await fetch(`http://localhost:5000/Airbnb/api/price/${price}`);
  const data = await response.json();
  console.log("data:", data);
  if(response.status === 200)
  return data;
}

async function getListByType(type)
{
  console.log("by type:");
  const response = await fetch(`http://localhost:5000/Airbnb/api/type/${type}`);
  const data = await response.json();
  console.log("data:", data);
  if(response.status === 200)
  return data;
}


function Home() {
    const [lists, setList] = useState(null);
    const [detailedData, setDetailedData] = useState({data : null, status : "hidden"})
    
    
    function handleShowMoreBtn(id)
    {
      console.log("id: ",id);
       fetch(`http://localhost:5000/Airbnb/api/id/${id}`)
       .then((response)=>{
         response.json()
         .then((data)=>{
           setDetailedData({data : data.list[0], status : "show"});
         })
       })
    }

    function submitClicked(e)
    {
      let price = document.getElementById("inputPrice").value;
      let type = document.getElementById("inputType").value;
      let checked = document.querySelectorAll("input[type=checkbox]:checked")
      console.log("checked: ", checked);
      console.log("type: ", type);
      console.log("price: ", price);
        if(checked.length === 2)
        {
             getListByPrice_type(price, type)
             .then((list)=>{
              setList(list);
             })
        }
        else if(checked[0].name === "checkboxFilterType")
        {
          console.log("type");
          getListByType(type)
          .then((list)=>{
            setList(list);
          })
        }
        else
        {
          getListByPrice(price)
          .then((list)=>{
            setList(list);
          })
        }
    }


    function handleCheckbox(e)
    {
     
      let btn = document.getElementById("submitBtn");
      // eslint-disable-next-line default-case
      switch(e.target.name)
      {
        case "checkboxFilterType":
          let type = document.getElementById("inputType");
          
          if(e.target.checked)
          {
               type.classList.remove("filterUnchecked");
              type.classList.add("filterChecked"); 
             if(document.querySelectorAll("input[type=checkbox]:checked").length === 1)
             {
               btn.classList.remove("filterUnchecked")
               btn.classList.add("filterChecked")
             }
          }
          else
          { 
              type.classList.remove("filterChecked");
              type.classList.add("filterUnchecked");
              if(document.querySelectorAll("input[type=checkbox]:checked").length === 0)
              {
                btn.classList.remove("filterChecked");
               btn.classList.add("filterUnchecked");
              }
          }
          break;
          case "checkboxFilterPrice":
            let price = document.getElementById("inputPrice");
            if(e.target.checked)
            {
                 price.classList.remove("filterUnchecked");
                price.classList.add("filterChecked"); 
                if(document.querySelectorAll("input[type=checkbox]:checked").length === 1)
             {
               console.log("btn");
               btn.classList.remove("filterUnchecked")
               btn.classList.add("filterChecked")
             }
            }
            else
            { 
                price.classList.remove("filterChecked");
                price.classList.add("filterUnchecked");
                if(document.querySelectorAll("input[type=checkbox]:checked").length === 0)
              {
                btn.classList.remove("filterChecked");
               btn.classList.add("filterUnchecked");
              }
            }
            break;
      }
    }


   useEffect(()=>{
    fetch("http://localhost:5000/Airbnb/api")
    .then((response)=>{
      response.json()
      .then((data)=>{
          setList(data);
      })
    })
   },[])
    
  return (
      <div className="container">
      <Header/>
      <div>
        <h4 style={{display: "inline-block"}}>Filter by:</h4>
        <label htmlFor="checkboxFilterType" style={{marginRight: "3px", marginLeft: "8px"}}>Type</label><input name="checkboxFilterType" type="checkbox" onChange={handleCheckbox}/>
        <label htmlFor="checkboxFilterPrice" style={{marginRight: "3px", marginLeft: "8px"}}>Price</label><input name="checkboxFilterPrice" type="checkbox" onChange={handleCheckbox}/>
        <input id="inputType" className="filterUnchecked" style={{marginLeft: "8px"}} type="text" placeholder="Enter type"/>
        <input id="inputPrice" className="filterUnchecked" style={{marginLeft: "8px"}} type="text" placeholder="Enter price" />
        <button id="submitBtn" className="submitBtn filterUnchecked" onClick={submitClicked}>Submit</button>
      </div>
{lists && <Slider {...settings} className="slider">
            { lists.list.map((item,i)=>{
             return (<div key={i}><Card  btnClicked={handleShowMoreBtn} data={item}/></div>)
            })}
        </Slider>
}
    </div>
  )
}

export default Home

