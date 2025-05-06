import Tarjeta from "./Tarjeta";

interface TarjetaData {
  nombre: string;
  imagen: string;
}

interface GrupoTarjetasProps {
  tarjetas: TarjetaData[];
}

export default function GrupoTarjetas({ tarjetas }: GrupoTarjetasProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {tarjetas.map((tarjeta, index) => (
        <Tarjeta key={index} nombre={tarjeta.nombre} imagen={tarjeta.imagen} />
      ))}
    </div>
  );
}
