import React from "react";

export const ButtonComponent = ({
  onClick,
  children,
  colorBg,
  colorTxt,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  colorBg?: string;
  colorTxt?: string;
}) => {
  return (
    <button
      className={`
        ${colorBg ? colorBg : "bg-blue-500"} 
        ${colorTxt ? colorTxt : "text-white"} 
        active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
