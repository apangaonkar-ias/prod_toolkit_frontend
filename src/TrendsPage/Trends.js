import React from "react";
import Widgets from "../Widgets/Widgets";
import trendImage from "../images/trends.png";
import './Trends.css'

function Trends() {
  return (
    <div className="widget_padding">
    <div className="trends">
      <Widgets
        title="Trends"
        description="View skill development trends"
        image={trendImage}
        button_text="Check Trends"
      />
    </div>
    </div>
  );
}

export default Trends;
