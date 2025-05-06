"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ClickContextProps {
  totalClicks: number;
  incrementarTotalClicks: () => void;
}

const ClickContext = createContext<ClickContextProps | undefined>(undefined);

export function ClickProvider({ children }: { children: ReactNode }) {
  const [totalClicks, setTotalClicks] = useState(0);

  const incrementarTotalClicks = () => {
    setTotalClicks((prev) => prev + 1);
  };

  return (
    <ClickContext.Provider value={{ totalClicks, incrementarTotalClicks }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClickContext() {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error("useClickContext must be used within a ClickProvider");
  }
  return context;
}