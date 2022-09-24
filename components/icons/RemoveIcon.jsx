import React from "react";

const RemoveIcon = ({ onClick }) => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <circle cx="16.9707" cy="16.9707" r="16" fill="#DDDDDD" />
      <path
        d="M12.7285 21.2134L21.2138 12.7281"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.2138 21.2133L12.7285 12.728"
        stroke="#8A8A8A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RemoveIcon;
