"use client";

import { useState, useEffect } from "react";
import GrupoTarjetas from "./components/GrupoTarjetas";
import { useClickContext } from "./context/ClickContext";

export default function Home() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url('/background.gif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.85)", // suaviza un poco el fondo para mejorar contraste
        }}
      />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Memoria en Acción
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            ¡Descubre todas las parejas ocultas en este juego!
          </p>
        </div>
      </div>
    </>
  );
}
