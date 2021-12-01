import React from "react";
import Widgets from "../Widgets/Widgets";
import trendImage from "../images/trends.png";
import "./Trends.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

function Trends() {
  return (
    <>
      <Header />
      <div className="app__body">
        <div>
          <Sidebar />
        </div>
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
      </div>
      <Footer />
    </>
  );
}

export default Trends;
