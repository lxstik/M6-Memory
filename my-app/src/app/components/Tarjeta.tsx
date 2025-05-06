"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useClickContext } from "../context/ClickContext";

interface TarjetaProps {
  nombre: string;
  imagen: string;
}

export default function Tarjeta({ nombre, imagen }: TarjetaProps) {
  const [contador, setContador] = useState(0);
  const { incrementarTotalClicks } = useClickContext();

  const incrementarClicks = () => {
    setContador(contador + 1);
    incrementarTotalClicks(); // Incrementa el contador global
  };

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