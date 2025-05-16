import Tarjeta from "@/app/components/Tarjeta";
import TotalClicks from "@/app/components/TotalClicks";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Colección de Juegos</h1>
      <TotalClicks />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        <Tarjeta
          nombre="Zelda: Breath of the Wild"
          imagen="https://upload.wikimedia.org/wikipedia/en/9/98/The_Legend_of_Zelda_Breath_of_the_Wild.jpg"
        />
        <Tarjeta
          nombre="Hollow Knight"
          imagen="https://upload.wikimedia.org/wikipedia/en/3/32/Hollow_Knight_cover.jpg"
        />
      </div>
    </div>
  );
}