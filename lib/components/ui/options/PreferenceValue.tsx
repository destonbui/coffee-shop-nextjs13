"use client";

import { actionUpdatePreferenceValue } from "@/app/(admin)/dashboard/(website)/product-options/actions";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  val: "NONE" | "LESS" | "NORMAL" | "MORE";
  currentVal: "NONE" | "LESS" | "NORMAL" | "MORE";
  id: string;
};

const PreferenceValue = ({ val, currentVal, id }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        const { error } = await actionUpdatePreferenceValue(
          { newVal: val },
          id
        );

        if (error) {
          throw new Error("Update preference value failed");
        }

        router.refresh();
      }}
      className={`flex-1 cursor-pointer text-center ${
        currentVal === val && "bg-theme-green-main text-white"
      }`}
    >
      {val}
    </div>
  );
};

export default PreferenceValue;
