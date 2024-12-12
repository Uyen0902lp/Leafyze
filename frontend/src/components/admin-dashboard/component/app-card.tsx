import React from 'react';
import { Card } from 'antd';

interface AppCardProps {
  title?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode[];
  heightFull?: boolean;
}

const AppCard: React.FC<AppCardProps> = ({ title, extra, children, className, actions, heightFull }) => {
  return (
    <Card
      title={title}
      extra={extra}
      className={`${heightFull ? 'height-full' : ''} ${className}`}
      actions={actions}
      bordered={false}
    >
      {children}
    </Card>
  );
};

export default AppCard;
