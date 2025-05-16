"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useClickContext } from "../context/ClickContext";

//defino la interfaz para las props de la tarjeta
interface TarjetaProps {
  nombre: string;
  imagen: string;
  //llamo a la funcion que se ocupa de manejar el click en la tarjeta
  onClick?: () => void;
}

//defino el componente Tarjeta, paso props y defino el evento onClick. también aplico los estilos usando tailwind
export default function Tarjeta({ nombre, imagen, onClick }: TarjetaProps) {
  const [contador, setContador] = useState(0);
  const { incrementarTotalClicks } = useClickContext();

  //funcion que se encarga de incrementar el contador de clicks y llama a la funcion que se ocupa de manejar el click en la tarjeta
  const incrementarClicks = () => {
    setContador(contador + 1);
    incrementarTotalClicks();
    if (onClick) onClick();
  };

  //devuelvo el componente Tarjeta con los estilos aplicados, pasando las props
  return (
    <Card
      className="w-full max-w-sm overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={incrementarClicks}
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={imagen}
            alt={`Imatge de ${nombre}`}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">{nombre}</CardTitle>
        <p>Nombre de clics: {contador}</p>
      </CardContent>
    </Card>
  );
}