import React from "react";
import "../styles/Card.css";

const Card = ({ name, price, category }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-category">{category}</p>
        <p className="card-price">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;
