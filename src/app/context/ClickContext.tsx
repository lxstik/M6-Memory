"use client";

import { createContext, useContext, useState } from "react";

export type ClickContextType = {
  totalClicks: number;
  incrementarTotalClicks: () => void;
};

const ClickContext = createContext<ClickContextType | undefined>(undefined);

export function ClickProvider({ children }: { children: React.ReactNode }) {
  const [totalClicks, setTotalClicks] = useState(0);

  const incrementarTotalClicks = () => setTotalClicks((prev) => prev + 1);

  return (
    <ClickContext.Provider value={{ totalClicks, incrementarTotalClicks }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClickContext() {
  const context = useContext(ClickContext);
  if (!context) throw new Error("useClickContext must be used within ClickProvider");
  return context;
}