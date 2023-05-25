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
        isFocus ? "border border-emerald-700" : "border-none"
      } flex overflow-hidden transition-all ml-8 h-10 bg-gray-100 items-center py-2 px-4 rounded-full gap-2 font-1`}
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
        className=" pb-[2px] font-1 ml-2 placeholder:text-gray-500 text-gray-700 outline-none bg-transparent"
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
        <CancelIcon color="rgb(0, 111, 66)" />
      </motion.div>
    </div>
  );
};

export default Search;
