"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface DialogProps {
  isOpen: boolean;
  setOpenChange: () => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, setOpenChange, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);
  return (
    <>
      {show && (
        <div
          className={`fixed w-full h-screen flex items-center justify-center inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-200 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={setOpenChange}
        >
          <div
            className={`bg-white rounded-xl text-gray-900 shadow-md p-6 max-w-md w-full 
              transform transition-all duration-200
              ${
                isOpen
                  ? "scale-100 opacity-100 translate-y-0"
                  : "scale-95 opacity-0 translate-y-4"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button onClick={setOpenChange} className="cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
