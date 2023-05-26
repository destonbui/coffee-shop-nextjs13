"use client";

import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import { motion } from "framer-motion";
import CancelIcon from "../icons/CancelIcon";

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
        isFocus ? "border border-theme-green-main" : ""
      }  overflow-hidden transition-all ease-in-out ml-4 lg:ml-8 h-10 bg-gray-100 items-center py-2 px-4 rounded-full gap-2 font-arimo hidden md:flex md:w-[45px] md:hover:w-[280px] lg:w-auto`}
    >
      <motion.div
        onClick={() => {
          query();
        }}
        initial={{ scale: 1.2, cursor: "pointer" }}
      >
        <SearchIcon color="#9ca3af" />
      </motion.div>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          e.key === "Enter" ? query() : "";
        }}
        className="font-arimo ml-2 placeholder:text-gray-500 text-gray-700 outline-none bg-transparent"
        type="text"
        placeholder="Bạn muốn mua gì..."
        spellCheck={false}
      />

      <motion.div
        initial={{ opacity: 0, cursor: "default" }}
        animate={
          input !== ""
            ? { opacity: 1, cursor: "pointer" }
            : { opacity: 0, cursor: "default" }
        }
        transition={{ duration: 0.2 }}
        onClick={() => setInput("")}
      >
        <CancelIcon color="var(--theme-green-main)" />
      </motion.div>
    </div>
  );
};

export default Search;
