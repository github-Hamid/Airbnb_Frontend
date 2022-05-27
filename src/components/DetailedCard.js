import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/detailedCard.css";
import { useNavigate } from "react-router-dom";
function DetailedCard(props) {
  let navigate = useNavigate();
  let { id } = useParams();
  const[item, setItem] = useState(null);
  useEffect(()=>{
    console.log("id: ",id);
       fetch(`http://localhost:5000/Airbnb/api/id/${id}`)
       .then((response)=>{
         response.json()
         .then((data)=>{
           setItem(data.list[0]);
         })
       })
  },[])


  function btnClicked()
  {
    navigate("/");
  }
 
    
  return (
      <div className='divBody'>
      {console.log("props:",item)}
      {item && <div className="detailed">
       <div className='divContainer'><img src={item.images.picture_url} alt=""/></div>
      <p><span>Name:</span> {item.name}</p>
      <p><span>Country:</span> {item.address.country}</p>
      <p><span>Street:</span> {item.address.street}</p>
      <p><span>Price:</span> ${parseFloat(item.price['$numberDecimal']).toFixed(2)}</p>
      <p><span>Property type:</span> {item.property_type}</p>
      <p><span>Bedrooms: {item.bedrooms}</span></p>
      <p><span>Beds:</span> {item.beds}</p>
      <p><span>Description:</span> {item.description}</p>
      <p><span style={{fontSize: "1.5rem"}}>Review Scores:</span></p>
      <p><span>Accuracy:</span> {item.review_scores.review_scores_accuracy}</p>
      <p><span>Checkin:</span> {item.review_scores.review_scores_checkin}</p>
      <p><span>Cleanliness:</span> {item.review_scores.review_scores_cleanliness}</p>
      <p><span>Location:</span> {item.review_scores.review_scores_location}</p>
      <p><span>Rating:</span> {item.review_scores_rating}</p>
      
       <div className='divContainer'>
      <button id={item._id} onClick={btnClicked} className='detailed_button'>To Home</button>
      </div>
  </div>}
  </div>
  )
}

export default DetailedCard