import React, { useState } from "react";
import { ComponentCriteria } from "../../../shared/resources/types";
import AnimatedSwitch from "./animated-switch";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";

type ComponentProps = {
  component: ComponentCriteria;
  expand?: boolean;
};

const Component = ({ component, expand = true }: ComponentProps) => {
  const [collapsed, setCollapsed] = useState(!expand);
  return (
    <div className='component' id={component.name}>
      <div className='component-header'>
        {component.name === "Switch" ? (
          <AnimatedSwitch />
        ) : (
          <img
            className='img'
            src={component.imageUrl}
            alt={`${component.name} symbol`}
          />
        )}
        <h3>{`${component.name}${
          component.alternativeComponentNames
            ? ", " + component.alternativeComponentNames
            : ""
        }`}</h3>
        <button
          className='button-with-icon'
          aria-expanded={!collapsed}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <>
              <BsChevronDoubleDown />
              Show all criteria
            </>
          ) : (
            <>
              <BsChevronDoubleUp />
              Hide criteria
            </>
          )}
        </button>
        <p>{component.description}</p>
      </div>
      {!collapsed &&
        component.testModes.map((testmode) => (
          <div
            key={testmode.testMode}
            id={`${component.name}-${testmode.testMode}`}
            className='testmode'
          >
            <h4>{testmode.testMode} Criteria</h4>
            {testmode.criteria.map((criterion) => (
              <div key={criterion._id} className='criterion'>
                <p className='criterion-title'>{criterion.title}</p>
                <p>
                  <strong>ID:</strong> {criterion._id}
                </p>
                <p>
                  <strong>Helptext:</strong> {criterion?.help}
                </p>
                <p>
                  <strong>Sources:</strong>. This criterion is based on the
                  following:
                </p>
                <ul>
                  {criterion.sources?.map((item) => (
                    <li key={item}>
                      <a href={item} target='_blank' rel='noreferrer'>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Component;
