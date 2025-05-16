import React from "react";
import "../globals.css";

// defino la interfaz para las tarjetas
interface Tarjeta {
  id: number;
  nombre: string;
  imagen: string;
  volteada: boolean;
  encontrada: boolean;
}

// defino la interfaz para las props del componente
interface Props {
  tarjetas: Tarjeta[];
  //llamo a la funcion que se ocupa de manejar el click en la tarjeta
  manejarClickTarjeta(id: number): void;
}

//defino el componente GrupoTarjetas, genero el grid de tarjetas, paso props y defino el evento onClick. también aplico los estilos con tailwind
export default function GrupoTarjetas({ tarjetas, manejarClickTarjeta }: Props) {
  return (
    <div className="grid grid-cols-6 gap-4 justify-center">
      {tarjetas.map((tarjeta) => (
        <div
          key={tarjeta.id}
          className="relative w-[120px] h-[120px] cursor-pointer group perspective"
          onClick={() => manejarClickTarjeta(tarjeta.id)}
        >
          <div
            className={`relative w-full h-full transition-transform duration-500 transform ${
              tarjeta.volteada || tarjeta.encontrada ? "rotate-y-180" : ""
            }`}
          >
            {/* Cara frontal */}
            <div className="absolute w-full h-full bg-gray-300 flex items-center justify-center rounded-lg shadow-md">
              <div className="h-full w-full bg-gray-400 rounded-lg"></div>
            </div>

            {/* Cara trasera */}
            <div className="absolute w-full h-full bg-white flex items-center justify-center rounded-lg shadow-md transform rotate-y-180">
              <img
                src={tarjeta.imagen}
                alt={tarjeta.nombre}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}