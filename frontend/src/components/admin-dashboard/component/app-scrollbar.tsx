import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface AppScrollbarProps {
  children: React.ReactNode;
}

const AppScrollbar: React.FC<AppScrollbarProps> = ({ children }) => {
  return <SimpleBar className="app-scrollbar">{children}</SimpleBar>;
};

export default AppScrollbar;
