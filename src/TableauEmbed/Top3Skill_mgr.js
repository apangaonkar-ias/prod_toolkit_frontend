import React, { useRef, useEffect } from "react";

const { tableau } = window;

export default function Top3Skill_mgr() {
  const ref = useRef(null);
  // const url = "https://public.tableau.com/views/EmplyeeExp/Sheet1";
  const url =
    // "  https://public.tableau.com/views/EmplyeeAdTechExperienceTeamSpecific/Dashboard1";
    "https://public.tableau.com/views/Top3SkillsIAS/top3skillsquality";
  const options = {
    device: "desktop",
  };

  const initviz = () => {
    new tableau.Viz(ref.current, url, options);
  };

  useEffect(() => {
    initviz();
  }, []);

  return (
    <div>
      <div ref={ref}></div>
    </div>
  );
}
