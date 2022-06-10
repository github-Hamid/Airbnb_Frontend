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

async function getListByCountry(country)
{
  console.log("by country:");
  const response = await fetch(`http://localhost:5000/Airbnb/api/country/${country}`);
  const data = await response.json();
  if(response.status === 200)
  return data;
}

async function getListByPrice_country(price, country)
{
  console.log("by price & country:");
  const response  = await fetch(`http://localhost:5000/Airbnb/api/price&country?price=${price}&country=${country}`);
  const data = await response.json();
  if(response.status === 200)
  return data;
}

async function getListByType_country(type, country)
{
  console.log("by type & country");
  const response = await fetch(`http://localhost:5000/Airbnb/api/type&country?type=${type}&country=${country}`);
  const data = await response.json();
  if(response.status === 200)
  return data;
}

async function getListByPrice_type_country(price, type, country)
{
  console.log("by price & type & country");
  const response = await fetch(`http://localhost:5000/Airbnb/api/price&type&country?price=${price}&type=${type}&country=${country}`);
  const data = await response.json();
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
      let country = document.getElementById("inputCountry").value;
      let checked = document.querySelectorAll("input[type=checkbox]:checked")
      console.log("checked: ", checked);
      console.log("type: ", type);
      console.log("price: ", price);
        if(checked.length === 2)
        {
          //----------------------------------------------
          let first = checked[0].name.substr(14).toLowerCase();
          let second = checked[1].name.substr(14).toLowerCase();
          let sortedArray = [`${first}`, `${second}`].sort();
          let status = sortedArray[0] == "country" ? (sortedArray[1] == "type" ? (1) : (2)) : (3)
          console.log("Sorted array:", sortedArray , "status:", status);
          // eslint-disable-next-line default-case
          switch(status)
          {
            case 1 : 
            getListByType_country(type, country)
            .then((data)=>{
              setList(data);
            })
            break;
            case 2 :
              getListByPrice_country(price, country)
              .then((data)=>{
                setList(data);
              })
              break;
              case 3:
                getListByPrice_type(price, type)
             .then((list)=>{
              setList(list);
             })
                break;
          }
        }
        else if(checked.length === 1)
        {
          let name = checked[0].name.substr(14).toLowerCase();
          // eslint-disable-next-line default-case
          switch(name)
          {
            case "price":
              getListByPrice(price)
              .then((data)=>{
                setList(data)
              })
              break;
              case "type" : 
              getListByType(type)
              .then((data)=>{
                setList(data)
              })
              break;
              case "country" :
                getListByCountry(country)
              .then((data)=>{
                setList(data)
              })
                break;
          }
        }
        else
        {
          getListByPrice_type_country(price, type, country)
          .then((data)=>{
            setList(data);
          })
        }
          //--------------------------------------------
        //      getListByPrice_type(price, type)
        //      .then((list)=>{
        //       setList(list);
        //      })
        // }
        // else if(checked[0].name === "checkboxFilterType")
        // {
        //   console.log("type");
        //   getListByType(type)
        //   .then((list)=>{
        //     setList(list);
        //   })
        // }
        // else
        // {
        //   getListByPrice(price)
        //   .then((list)=>{
        //     setList(list);
        //   })
        // }
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
               type.classList.remove("container__div--unchecked");
              type.classList.add("container__div--checked"); 
             if(document.querySelectorAll("input[type=checkbox]:checked").length === 1)
             {
               btn.classList.remove("container__div--unchecked")
               btn.classList.add("container__div--checked")
             }
          }
          else
          { 
              type.classList.remove("container__div--checked");
              type.classList.add("container__div--unchecked");
              if(document.querySelectorAll("input[type=checkbox]:checked").length === 0)
              {
                btn.classList.remove("container__div--checked");
               btn.classList.add("container__div--unchecked");
              }
          }
          break;
          case "checkboxFilterPrice":
            let price = document.getElementById("inputPrice");
            if(e.target.checked)
            {
                 price.classList.remove("container__div--unchecked");
                price.classList.add("container__div--checked"); 
                if(document.querySelectorAll("input[type=checkbox]:checked").length === 1)
             {
               console.log("btn");
               btn.classList.remove("container__div--unchecked")
               btn.classList.add("container__div--checked")
             }
            }
            else
            { 
                price.classList.remove("container__div--checked");
                price.classList.add("container__div--unchecked");
                if(document.querySelectorAll("input[type=checkbox]:checked").length === 0)
              {
                btn.classList.remove("container__div--checked");
               btn.classList.add("container__div--unchecked");
              }
            }
            break;
            case "checkboxFilterCountry":      
              let country = document.getElementById("inputCountry");
              if(e.target.checked)
              {
                   country.classList.remove("container__div--unchecked");
                   country.classList.add("container__div--checked"); 
                  if(document.querySelectorAll("input[type=checkbox]:checked").length === 1)
               {
                 console.log("btn");
                 btn.classList.remove("container__div--unchecked")
                 btn.classList.add("container__div--checked")
               }
              }
              else
              { 
                country.classList.remove("container__div--checked");
                country.classList.add("container__div--unchecked");
                  if(document.querySelectorAll("input[type=checkbox]:checked").length === 0)
                {
                  btn.classList.remove("container__div--checked");
                 btn.classList.add("container__div--unchecked");
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
      <Header  style={{zIndex: "1"}}/>
      <div className="container__div">
        <h4 style={{display: "inline-block"}}>Filter by:</h4>
        <label htmlFor="checkboxFilterType" style={{marginRight: "3px", marginLeft: "8px"}}>Type</label><input name="checkboxFilterType" type="checkbox" onChange={handleCheckbox}/>
        <label htmlFor="checkboxFilterPrice" style={{marginRight: "3px", marginLeft: "8px"}}>Price</label><input name="checkboxFilterPrice" type="checkbox" onChange={handleCheckbox}/>
        <label htmlFor="checkboxFilterCountry" style={{marginRight: "3px", marginLeft: "8px"}}>Country</label><input name="checkboxFilterCountry" type="checkbox" onChange={handleCheckbox}/>
        <input id="inputType" className="container__div--unchecked" style={{marginLeft: "8px"}} type="text" placeholder="Enter type"/>
        <input id="inputPrice" className="container__div--unchecked" style={{marginLeft: "8px"}} type="text" placeholder="Enter price" />
        <input id="inputCountry" className="container__div--unchecked" style={{marginLeft: "8px"}} type="text" placeholder="Enter country" />
        <button id="submitBtn" className="container__div__btn container__div--unchecked" onClick={submitClicked}>Submit</button>
      </div>
{lists && <Slider style={{zIndex: "0"}} {...settings} className="slider">
            { lists.list.map((item,i)=>{
             return (<div  key={i}><Card btnClicked={handleShowMoreBtn} data={item}/></div>)
            })}
        </Slider>
}
    </div>
  )
}

export default Home

