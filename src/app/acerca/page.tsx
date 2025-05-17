export default function AcercaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Reglas Básicas del Juego de Memoria</h1>
      <p className="max-w-3xl text-lg text-gray-700 mb-4">
        El objetivo del juego es encontrar todas las parejas de tarjetas iguales en el menor tiempo posible.
      </p>
      <ul className="max-w-3xl list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>Al inicio, todas las tarjetas están boca abajo.</li>
        <li>En cada turno, puedes voltear dos tarjetas para descubrir qué imagen tienen.</li>
        <li>Si las dos tarjetas son iguales, se mantienen descubiertas y forman una pareja.</li>
        <li>Si no coinciden, se vuelven a girar boca abajo.</li>
        <li>El juego termina cuando todas las parejas han sido encontradas.</li>
      </ul>
      <p className="max-w-3xl text-lg text-gray-700">
        ¡Pon a prueba tu memoria y trata de encontrar todas las parejas lo más rápido posible!
      </p>
    </div>
  );
}
