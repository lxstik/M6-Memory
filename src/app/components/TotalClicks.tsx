"use client";

import { useClickContext } from "../context/ClickContext";

export default function TotalClicks() {
  const { totalClicks } = useClickContext();

  return <p className="text-xl font-bold">Total de clics globals: {totalClicks}</p>;
}