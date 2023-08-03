"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface NavbarVisibilityContextType {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const NavbarVisibilityContext =
  createContext<NavbarVisibilityContextType | null>(null);

export const NavbarVisibilityContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isVisible, setVisible] = useState<boolean>(true);

  return (
    <NavbarVisibilityContext.Provider value={{ isVisible, setVisible }}>
      {children}
    </NavbarVisibilityContext.Provider>
  );
};
