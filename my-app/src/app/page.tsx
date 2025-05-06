"use client";

import GrupoTarjetas from "./components/GrupoTarjetas";
import { useClickContext } from "./context/ClickContext";

const tarjetas = [
  { nombre: "Zelda", imagen: "/assets/zelda.png" },
  { nombre: "Mario", imagen: "/assets/zelda.png" },
  { nombre: "Kirby", imagen: "/assets/zelda.png" },
];

export default function Home() {
  const { totalClicks } = useClickContext();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Colección de Juegos</h1>
      {/* Mostrar el total de clics globales */}
      <p className="text-xl font-semibold mb-4">Total de clics: {totalClicks}</p>
      <GrupoTarjetas tarjetas={tarjetas} />
    </div>
  );
}