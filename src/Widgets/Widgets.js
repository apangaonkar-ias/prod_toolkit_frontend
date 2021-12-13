import React from "react";
import "./Widgets.css";

function Widgets({ title, description, image }) {
  return (
    <div>
      <div className="widgets">
        <h1>{title}</h1>
        <p>{description}</p>
        <img src={image} alt="image" />={" "}
      </div>
    </div>
  );
}

export default Widgets;
