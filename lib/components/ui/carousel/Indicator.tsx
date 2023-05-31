import React from "react";

interface Props {
  active: Boolean;
  handleClick: () => void;
}

const Indicator = ({ active, handleClick }: Props) => {
  return (
    <div
      onClick={() => handleClick()}
      className={`rounded-full h-3 w-3 ${
        active ? "bg-gray-600" : "bg-gray-400 cursor-pointer"
      } transition duration-700 ease-in-out`}
    />
  );
};

export default Indicator;
