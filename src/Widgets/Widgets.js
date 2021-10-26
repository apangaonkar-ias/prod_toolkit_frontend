import React from "react";
import "./Widgets.css";

function Widgets({ title, description, image, button_text, route }) {
  return (
    <div>
      <div className="widgets">
        {/* <div className="widgets__content"> */}
        <h1>{title}</h1>

        <p>{description}</p>

        <img src={image} alt="image" />

        {/* </div> */}
      </div>
    </div>
  );
}

export default Widgets;
