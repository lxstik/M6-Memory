import GrupoTarjetas from "./components/GrupoTarjetas";

const tarjetas = [
  { nombre: "Zelda", imagen: "/assets/zelda.png" },
  { nombre: "Mario", imagen: "/assets/zelda.png" },
  { nombre: "Kirby", imagen: "/assets/zelda.png" },
];

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Colección de Juegos</h1>
      <GrupoTarjetas tarjetas={tarjetas} />
    </div>
  );
}
