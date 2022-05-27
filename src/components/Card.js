import React from 'react'
import "../css/card.css"
import { useNavigate } from "react-router-dom";
function Card(props) {
  let navigate = useNavigate();

function moreInfoBtnClicked(e)
{
 
     let id = e.target.id;
    navigate(`/detailed/${id}`);
}

  return (
    <>
   
    <div className='card'>
       <div className='imageDiv'><img src={props.data.images.picture_url} alt=""/></div>
        <p><span>Name:</span> {props.data.name}</p>
        <p><span>Country:</span> {props.data.address.country}</p>
        <p><span>Street:</span> {props.data.address.street}</p>
        <p><span>Price:</span> ${parseFloat(props.data.price['$numberDecimal']).toFixed(2)}</p>
        <p><span>Property type:</span> {props.data.property_type}</p>

        <button id={props.data._id} onClick={moreInfoBtnClicked} className='card_button'>View more...</button>
    </div>
    </>
  )
}

export default Card