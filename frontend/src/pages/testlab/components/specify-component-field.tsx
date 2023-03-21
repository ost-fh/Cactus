import React, { useEffect, useState } from "react";
import Alert from "../../../shared/components/alert";
import {
  componentCriteria,
  getComponent,
  version,
} from "../../../shared/resources/types";

type SpecifyComponentFieldProps = {
  componentCriteria: componentCriteria;
  version: version | undefined;
  children: any;
};

const SpecifyComponentField = ({
  componentCriteria,
  version,
  children,
}: SpecifyComponentFieldProps) => {
  const [exists, setExists] = useState(true);

  useEffect(() => {
    const result = version && getComponent(version, componentCriteria.name);
    if (result?.exists === false) {
      setExists(false);
    } else {
      setExists(true);
    }
  }, [componentCriteria.name, version]);

  return (
    <div className='specify-component'>
      <img
        src={componentCriteria.imageUrl}
        width={150}
        height={150}
        alt={componentCriteria.name}
      />
      <div className='specify-component-content'>
        <div className='specify-component-header'>
          <h3>{componentCriteria.name}</h3>
          <p>{componentCriteria.alternativeComponentNames}</p>
        </div>
        {exists ? (
          <div className='specify-component-options'>{children}</div>
        ) : (
          <Alert
            type='info'
            message='This component is marked as "not available" in this library'
          >
            This component is marked as "not available" in this library. If you
            find this to be false, reenable the component please.
            <button onClick={() => setExists(true)}>Reenable Component</button>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SpecifyComponentField;
