import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";

type ToggletipProps = {
  label: string;
  children: any;
  position?: "center" | "left" | "right";
};

const Toggletip = (props: ToggletipProps) => {
  const [active, setActive] = useState(false);

  //   const toggleActive = () => {
  //     setActive(!active);
  //   };

  const activate = () => {
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
  };
  return (
    <div className='tooltip-container'>
      <button
        onClick={activate}
        onBlur={deactivate}
        className={`icon-button ${active ? "" : ""}`}
      >
        <BsInfoLg /> {props.label}
      </button>

      <div
        className={`tooltip-element ${
          props.position ? "tooltip-element-" + props.position : ""
        } ${active ? "tooltip-element-visible" : ""}`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Toggletip;
