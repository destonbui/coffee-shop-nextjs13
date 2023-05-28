import React from "react";

interface Props {
  active: Boolean;
  handleClick: () => void;
}

const Indicator = ({ active, handleClick }: Props) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`rounded-full ${
        active
          ? "bg-gray-900/80 h-4 w-4"
          : "bg-gray-400/80 cursor-pointer h-3 w-3"
      } transition duration-700 ease-in-out`}
    />
  );
};

export default Indicator;
