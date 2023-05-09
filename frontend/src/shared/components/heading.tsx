import React, { useEffect, useRef } from "react";
import "./heading.css";

// This component is used for focus management und pagetitle management while navigating pages for screenreaders
type HeadingProps = {
  children: string;
  noFocus?: boolean;
};

const Heading = ({ children, noFocus = false }: HeadingProps) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headerRef && headerRef.current && !noFocus) {
      headerRef.current.focus();
    }
  }, [noFocus]);

  // separate from focus to not refocus on propchange
  useEffect(() => {
    document.title = `Project Cactus - ${children}`;
  }, [children]);

  return (
    <h1 className='heading-h1' tabIndex={-1} ref={headerRef}>
      {children}
    </h1>
  );
};

export default Heading;
