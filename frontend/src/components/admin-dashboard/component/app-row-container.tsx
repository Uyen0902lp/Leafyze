import React from 'react';
import { Row } from 'antd';

interface AppRowContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const AppRowContainer: React.FC<AppRowContainerProps> = ({ children, style }) => {
  return (
    <div className="app-row-container" style={style}>
      <Row gutter={[16, 32]}>{children}</Row>
    </div>
  );
};

export default AppRowContainer;
