"use client";

import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="px-28 py-16 w-full min-h-screen bg-indigo-100 text-black">
      {children}
    </div>
  );
};

export default Wrapper;
