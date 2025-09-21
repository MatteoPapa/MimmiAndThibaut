// src/components/Layout.jsx
import React from "react";
import LanguageSelector from "./LanguageSelector";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <LanguageSelector />
      {children}
    </div>
  );
};

export default Layout;
