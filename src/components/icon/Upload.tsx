import React from "react";

const Upload = ({ color }: any) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 1.5L9 11.5M9 1.5C8.29977 1.5 6.99153 3.4943 6.5 4M9 1.5C9.70023 1.5 11.0085 3.4943 11.5 4"
      stroke={color ? color : "#141B34"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 13.5C17 15.982 16.482 16.5 14 16.5H4C1.518 16.5 1 15.982 1 13.5"
      stroke={color ? color : "#141B34"}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Upload;
