import React from "react";

export const Button = ({ children, onClick }) => {
  return (
    <button
      type="button"
      className="bg-black text-white px-3 py-1 rounded-xl font-inter text-sm font-semibold"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;