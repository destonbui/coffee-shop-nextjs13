"use client";

import React, { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import CancelIcon from "../../icons/CancelIcon";

interface Props {}

const Search = (props: Props) => {
  const [input, setInput] = useState<string>("");
  const [isFocus, setFocus] = useState<Boolean>(false);

  const query = () => {
    console.log("Searching for: ", input);
  };

  return (
    <div
      className={`${
        isFocus ? "border border-theme-green-main md:w-[260px]" : ""
      }  overflow-hidden transition-all ease-in-out ml-4 lg:ml-8 h-10 bg-gray-100 items-center py-2 px-4 rounded-full gap-2 font-arimo hidden md:flex md:w-[45px] md:hover:w-[260px] lg:w-auto lg:hover:w-auto`}
    >
      <div
        onClick={() => {
          query();
        }}
      >
        <SearchIcon color="#9ca3af" />
      </div>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" ? query() : "";
        }}
        className="font-arimo ml-2 placeholder:text-gray-500 text-gray-700 outline-none bg-transparent border-none"
        type="text"
        placeholder="Bạn muốn mua gì..."
        spellCheck={false}
      />

      <div
        onClick={() => setInput("")}
        className={`${
          input !== "" ? "cursor-pointer opacity-100" : "opacity-0"
        } transition-opacity ease-in-out`}
      >
        <CancelIcon color="var(--theme-green-main)" />
      </div>
    </div>
  );
};

export default Search;
