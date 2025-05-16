"use client";

import { createContext, useContext, useState } from "react";

interface ClickContextType {
  totalClicks: number;
  incrementarClicks: () => void;
}

const ClickContext = createContext<ClickContextType | undefined>(undefined);

export function ClickProvider({ children }: { children: React.ReactNode }) {
  const [totalClicks, setTotalClicks] = useState(0);

  const incrementarClicks = () => {
    setTotalClicks((prev) => prev + 1);
  };

  return (
    <ClickContext.Provider value={{ totalClicks, incrementarClicks }}>
      {children}
    </ClickContext.Provider>
  );
}

export function useClickContext() {
  const context = useContext(ClickContext);
  if (!context) {
    throw new Error("useClickContext debe usarse dentro de un ClickProvider");
  }
  return context;
}