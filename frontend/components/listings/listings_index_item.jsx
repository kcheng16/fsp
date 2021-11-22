import React from "react";
import { Link } from "react-router-dom";

const ListingsIndexItem = (props) => {
  console.log("index item")
  console.log(props.listing)
  return(
  <div>
    <Link to={`/listings/${props.listing.id}`}>link</Link>
      <h2>{props.listing.title}</h2>
      <h3>{props.listing.price} Dogecoins/night</h3>
      <h3>{props.listing.city}</h3>
      <h3>Cat's {props.listing.cat_friendly ? "are welcomed!" : "are not welcomed"}</h3>
  </div>
  )
}

export default ListingsIndexItem