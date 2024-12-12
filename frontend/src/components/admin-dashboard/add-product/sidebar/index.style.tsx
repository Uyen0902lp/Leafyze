import React from 'react';

const StyledFormWrapper: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return <div className="side-bar">{children}</div>;
};

export default StyledFormWrapper;
