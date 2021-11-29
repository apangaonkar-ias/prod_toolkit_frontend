import React, { useRef, useEffect } from "react";

const { tableau } = window;

export default function TableauEmp() {
  const ref = useRef(null);
  const url = "https://public.tableau.com/views/EmplyeeExp/Sheet1";

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
