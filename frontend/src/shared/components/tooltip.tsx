import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import Bubble, { BubbleProps } from "./bubble";
import "./tooltip.scss";

type TooltipProps = {
  tooltipElement?: any;
  children: any;
  position?: "center" | "left" | "right";
  bubbleData?: BubbleProps;
};

const Tooltip = (props: TooltipProps) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  const activate = () => {
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
  };

  return (
    <div className='tooltip-container'>
      <div
        className='tooltip-source'
        tabIndex={0}
        onFocus={activate}
        onMouseEnter={activate}
        onMouseLeave={deactivate}
        onBlur={deactivate}
        onTouchStart={toggleActive}
      >
        {props.tooltipElement ? (
          <div
            className={`tooltip-source-from-prop ${
              active ? "tooltip-source-active" : ""
            }`}
          >
            {props.tooltipElement}
          </div>
        ) : props.bubbleData ? (
          <Bubble
            value={props.bubbleData.value}
            label={props.bubbleData.label}
            color={props.bubbleData.color}
            className={active ? "tooltip-source-active" : undefined}
          />
        ) : (
          <div
            className={`tooltip-source-default ${
              active ? "tooltip-source-active" : ""
            }`}
          >
            <BsInfoLg />
          </div>
        )}
      </div>

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

export default Tooltip;
