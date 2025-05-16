"use client";

import { useState, useEffect } from "react";
import GrupoTarjetas from "./components/GrupoTarjetas";
import { useClickContext } from "./context/ClickContext";

export default function Home() {
  const { totalClicks, incrementarTotalClicks } = useClickContext();
  const [tarjetas, setTarjetas] = useState<
    { id: number; nombre: string; imagen: string; volteada: boolean; encontrada: boolean }[]
  >([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [puntos, setPuntos] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  function barajarTarjetas(tarjetas) {
    const barajadas = [...tarjetas];
    for (let i = barajadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [barajadas[i], barajadas[j]] = [barajadas[j], barajadas[i]];
    }
    return barajadas;
  }

  useEffect(() => {
    async function obtenerPokemons() {
      try {
        const idsAleatorios = Array.from({ length: 9 }, () =>
          Math.floor(Math.random() * 898) + 1
        );

        const pokemons = await Promise.all(
          idsAleatorios.map(async (id) => {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const datosPokemon = await respuesta.json();
            return {
              id: datosPokemon.id,
              nombre: datosPokemon.name,
              imagen: datosPokemon.sprites.front_default,
            };
          })
        );

        const tarjetasDuplicadas = [...pokemons, ...pokemons].map((pokemon, index) => ({
          ...pokemon,
          id: index + 1,
          volteada: false,
          encontrada: false,
        }));

        setTarjetas(barajarTarjetas(tarjetasDuplicadas));
      } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
      }
    }

    obtenerPokemons();
  }, []);

  const manejarClickTarjeta = (id: number) => {
    if (!juegoIniciado || tiempoRestante <= 0) return;
    if (seleccionadas.length === 2 || tarjetas.find((t) => t.id === id)?.volteada) {
      return;
    }

    incrementarTotalClicks(); // <--- CORRECTO

    const nuevasTarjetas = tarjetas.map((tarjeta) =>
      tarjeta.id === id ? { ...tarjeta, volteada: true } : tarjeta
    );
    setTarjetas(nuevasTarjetas);

    const nuevasSeleccionadas = [...seleccionadas, id];
    setSeleccionadas(nuevasSeleccionadas);

    if (nuevasSeleccionadas.length === 2) {
      const [primera, segunda] = nuevasSeleccionadas;
      const tarjeta1 = tarjetas.find((t) => t.id === primera);
      const tarjeta2 = tarjetas.find((t) => t.id === segunda);

      if (tarjeta1?.nombre === tarjeta2?.nombre) {
        setPuntos((prev) => prev + 1);
        setTarjetas((prev) =>
          prev.map((tarjeta) =>
            tarjeta.id === primera || tarjeta.id === segunda
              ? { ...tarjeta, encontrada: true }
              : tarjeta
          )
        );
      } else {
        setTimeout(() => {
          setTarjetas((prev) =>
            prev.map((tarjeta) =>
              tarjeta.id === primera || tarjeta.id === segunda
                ? { ...tarjeta, volteada: false }
                : tarjeta
            )
          );
        }, 1000);
      }
      setSeleccionadas([]);
    }
  };

  const iniciarJuego = () => {
    setJuegoIniciado(true);
    setTiempoRestante(40);
    setPuntos(0);
    setMensaje(null);
    setTarjetas((prev) =>
      prev.map((tarjeta) => ({ ...tarjeta, volteada: false, encontrada: false }))
    );
  };

  useEffect(() => {
    if (juegoIniciado && tiempoRestante > 0) {
      const intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(intervalo);
    } else if (juegoIniciado && tiempoRestante === 0) {
      if (!tarjetas.every((tarjeta) => tarjeta.encontrada)) {
        setMensaje("Se acabó el tiempo. ¡Inténtalo de nuevo! ⏳");
        setJuegoIniciado(false);
      }
    }
  }, [juegoIniciado, tiempoRestante]);

  useEffect(() => {
    if (juegoIniciado && tarjetas.every((tarjeta) => tarjeta.encontrada)) {
      setMensaje("¡Felicidades! Has ganado el juego 🎉");
      setJuegoIniciado(false);
    }
  }, [juegoIniciado, tarjetas]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Juego de Memoria Pokémon</h1>
      {mensaje && (
        <div className="text-center mb-4 text-xl font-semibold text-red-500">
          {mensaje}
        </div>
      )}
      <div className="text-center mb-4">
        <button
          onClick={iniciarJuego}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          INICIAR
        </button>
      </div>
      <div className="text-center mb-4">
        <p className="text-xl font-semibold">Tiempo restante: {tiempoRestante}s</p>
        <p className="text-xl font-semibold">Puntos: {puntos}</p>
        <p className="text-xl font-semibold">Total de clics: {totalClicks}</p>
      </div>
      <GrupoTarjetas tarjetas={tarjetas} manejarClickTarjeta={manejarClickTarjeta} />
    </div>
  );
}