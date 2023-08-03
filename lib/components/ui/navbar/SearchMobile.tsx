"use client";

import { useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import CancelIcon from "../../icons/CancelIcon";

import { Drawer } from "vaul";

type Props = {};

const SearchMobile = (props: Props) => {
  const [input, setInput] = useState<string>("");

  const query = () => {
    console.log("Searching for: ", input);
  };

  return (
    <div className={`relative flex  h-12 flex-col justify-center md:hidden`}>
      <Drawer.Root>
        <Drawer.Trigger>
          <div className="mx-4 flex items-center gap-2 overflow-hidden rounded-full bg-gray-100 px-4 py-2 font-arimo transition-all ease-out">
            <div
              onClick={() => {
                query();
              }}
              className="cursor-pointer"
            >
              <SearchIcon color="#9ca3af" />
            </div>
            <input
              className="pointer-events-none ml-2 flex-grow border-none bg-transparent font-arimo text-gray-700 outline-none placeholder:text-gray-500"
              type="text"
              placeholder="Bạn muốn mua gì..."
              spellCheck={false}
            />
          </div>
        </Drawer.Trigger>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 z-[100]  flex h-[77%] flex-col rounded-t-[10px] bg-zinc-100">
            <div className="flex-1 rounded-t-[10px] bg-white p-4">
              <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-gray-300" />
              <div className="mx-auto max-w-md">
                <Drawer.Title className="mb-4 font-medium">
                  Unstyled drawer for React.
                </Drawer.Title>
                <p className="mb-2 text-zinc-600">
                  This component can be used as a replacement for a Dialog on
                  mobile and tablet devices.
                </p>
                <p className="mb-8 text-zinc-600">
                  It uses{" "}
                  <a
                    href="https://www.radix-ui.com/docs/primitives/components/dialog"
                    className="underline"
                    target="_blank"
                  >
                    Radix&apos;s Dialog primitive
                  </a>{" "}
                  under the hood and is inspired by{" "}
                  <a
                    href="https://twitter.com/devongovett/status/1674470185783402496"
                    className="underline"
                    target="_blank"
                  >
                    this tweet.
                  </a>
                </p>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default SearchMobile;
