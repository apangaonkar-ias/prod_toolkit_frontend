import React from "react";
import Widgets from "../Widgets/Widgets";
import projectImage from "../images/project.png";

function MyProjects() {
  return (
    <div className="widget_padding">
    <div className="myProjects">
      <Widgets
        title="My Projects"
        description="View all your Projects in one go!"
        image={projectImage}
        button_text="Manage Projects"
      />
    </div>
    </div>
  );
}

export default MyProjects;
