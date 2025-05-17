"use client";

import { useState, useEffect } from "react";
import GrupoTarjetas from "../components/GrupoTarjetas";
import { useClickContext } from "../context/ClickContext";

export default function Juego() {
  //importo el context de clicks y la funcion para incrementar el total de clicks
  const { totalClicks, incrementarTotalClicks } = useClickContext();
  //defino los estados que utilizaré
  const [tarjetas, setTarjetas] = useState<
    { id: number; nombre: string; imagen: string; volteada: boolean; encontrada: boolean }[]
  >([]);
  //defino el estado para las tarjetas seleccionadas, puntos, tiempo restante, juego iniciado y mensaje
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [puntos, setPuntos] = useState(0);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);


  //Funcion para barrajar que recibe el array de tarjetas y devuelve un nuevo array barajado
  function barajarTarjetas(tarjetas) {
    //creo una copia del array original
    const barajadas = [...tarjetas];
    //un bucle que recorre el array desde el final hasta el principio
    for (let i = barajadas.length - 1; i > 0; i--) {
      //genero un numero random
      const j = Math.floor(Math.random() * (i + 1));
      //intercambio el elemento actual (de la posicion "i") con el elemento en la posicion "j", 
      [barajadas[i], barajadas[j]] = [barajadas[j], barajadas[i]];
    }
    //devuelvo el array barajado
    return barajadas;
  }


  //creo este useEffect para obtener los pokemons de la API
  useEffect(() => {
    //defino asincrona para obtener los pokemons
    async function obtenerPokemons() {
      //intento obtener los pokemons aleatorios, entre 1 y 898(el ultipo pokemon), para que cada partida nueva sea con pokemons diferentes
      try {
        const idsAleatorios = Array.from({ length: 9 }, () =>
          Math.floor(Math.random() * 898) + 1
        );

        //creo un array vacio para guardar los pokemons
        const pokemons = [];
        //recorro el array de ids aleatorios
        for (let i = 0; i < idsAleatorios.length; i++) {
          //pillo y guardo el id del aleatorio
          const id = idsAleatorios[i];
          // saco los datos de la API
          const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const datosPokemon = await respuesta.json();
          // se guarda el pokemon en el array de pokemons que cree antes
          pokemons.push({
            id: datosPokemon.id,
            nombre: datosPokemon.name,
            imagen: datosPokemon.sprites.front_default,
          });
        }


        //creo un array de objetos con los pokemons duplicados, para que haya dos tarjetas iguales, con el .map recorro el array de pokemons
        const tarjetasDuplicadas = [...pokemons, ...pokemons].map((pokemon, index) => ({
          //le asigno un id, la propiedad "volteada" en false y la propiedad "encontrada" en false
          ...pokemon,
          id: index + 1,
          volteada: false,
          encontrada: false,
        }));
        //barajo las tarjetas duplicadas y las guardo en el estado
        setTarjetas(barajarTarjetas(tarjetasDuplicadas));
      }
      //si hay un error muestra mensaje por consola
      catch (error) {
        console.error("No se ha podido sacar al pokemon de la API", error);;
      }
    }
    //llamo a la funcion para obtener los pokemons
    obtenerPokemons();
  }, []);

  //creo una funcion para manejar el click en las tarjetas
  const manejarClickTarjeta = (id: number) => {
    // si el juego no ha empezado o el tiempo se ha acabado, no se puede voltear las tarjetas
    if (!juegoIniciado || tiempoRestante <= 0) return;

    // si ya hay dos tarjetas seleccionadas, no dejamos seleccionar otra (LA LOGICA DE BLOQUEO NO FUNCIONA)
    //  const yaHayDosSeleccionadas = seleccionadas.length === 2;

    // buscamos la tarjeta que se ha clicado en el array de tarjetas con el .find
    const tarjetaClicada = tarjetas.find((t) => t.id === id);

    // si la tarjeta ya está volteada, no se le puede hacer nada
    const yaEstaVolteada = tarjetaClicada?.volteada === true;

    // si alguna de las dos condiciones anteriores se cumple, cierro la funcion
    //  if (yaHayDosSeleccionadas || yaEstaVolteada) {
    //    return;
    // }

    incrementarTotalClicks(); //sumo click al total de clicks






    // creo un array aparte para guardar las tarjetas actualizadas
    const nuevasTarjetas = [];

    // recorrer las tarjetas y actualizar el estado de la tarjeta clicada
    for (let i = 0; i < tarjetas.length; i++) {
      //seleccionar la tarjeta actual
      const tarjeta = tarjetas[i];

      // si la tarjeta es la que he clicado, la giro (volteada: true)
      if (tarjeta.id === id) {
        //actualizo la tarjeta clicada en el nuevo array
        nuevasTarjetas.push({ ...tarjeta, volteada: true });
      } else {
        // si no la dejo igual
        nuevasTarjetas.push(tarjeta);
      }
    }

    // hay que actualizar el estado de las tarjetas con el nuevo array
    setTarjetas(nuevasTarjetas);





    //creo un array nuevo con las tarjetas seleccionadas
    const nuevasSeleccionadas = [...seleccionadas, id];
    //guardo dos tarjetas seleccionadas para mas tarde compararlas
    setSeleccionadas(nuevasSeleccionadas);


    // si hay dos tarjetas seleccionadas, comparo sus nombres
    if (nuevasSeleccionadas.length === 2) {
      // creo un array con las dos tarjetas seleccionadas
      const [primera, segunda] = nuevasSeleccionadas;
      //busco las tarjetas en el array de tarjetas con el .find 
      const tarjeta1 = tarjetas.find((t) => t.id === primera);
      const tarjeta2 = tarjetas.find((t) => t.id === segunda);

      //si los nombres coinciden, sumo un punto
      if (tarjeta1?.nombre === tarjeta2?.nombre) {
        setPuntos((prev) => prev + 1);
        // ahora marco esas dos tarjetas como encontradas
        setTarjetas((prevTarjetas) => {
          // creo un nuevo array vacio para guardar las tarjetas actualizadas
          const nuevasTarjetas = [];
          // recorro el array de tarjetas
          for (let i = 0; i < prevTarjetas.length; i++) {
            // selecciono la tarjeta actual
            const tarjeta = prevTarjetas[i];
            // si la tarjeta es una de las dos seleccionadas, la marco como encontrada
            if (tarjeta.id === primera || tarjeta.id === segunda) {
              nuevasTarjetas.push({ ...tarjeta, encontrada: true });
            } else {
              // si no coincide, la dejo igual
              nuevasTarjetas.push(tarjeta);
            }
          }
          return nuevasTarjetas;
        });
      } else {
        // si las tarjetas no son iguales hago la espera de 75% de segundo y las vuelvo a girar
        setTimeout(() => {
          // actualizo el estado de las tarjetas para girarlas
          setTarjetas((prevTarjetas) => {
            // creo un nuevo array vacio para guardar las tarjetas actualizadas
            const nuevasTarjetas = [];
            // recorro el array de tarjetas
            for (let i = 0; i < prevTarjetas.length; i++) {
              //selecciono la tarjeta actual
              const tarjeta = prevTarjetas[i];
              //si la tarjeta es una de las dos seleccionadas- la giro bocabajo
              if (tarjeta.id === primera || tarjeta.id === segunda) {
                nuevasTarjetas.push({ ...tarjeta, volteada: false });
              } else {
                // si no, la dejo igual
                nuevasTarjetas.push(tarjeta);
              }
            }
            return nuevasTarjetas;
          });
        }, 750);
      }
      // reinicio el array de seleccionadas
      setSeleccionadas([]);
    }
  };


  //creo una funcion para reiniciar el juego y definir los estados iniciales
  const iniciarJuego = () => {
    setJuegoIniciado(true);
    setTiempoRestante(40);
    setPuntos(0);
    setMensaje(null);
    //volteo todas las tarjetas a false y las marco como no encontradas
    setTarjetas((prev) =>
      prev.map((tarjeta) => ({ ...tarjeta, volteada: false, encontrada: false }))
    );
  };


  //creo un useEffect para manejar el tiempo restante
  useEffect(() => {
    //si el juego ha empezado y el tiempo es mayor a 0, empiezo a contar el tiempo
    if (juegoIniciado && tiempoRestante > 0) {
      //defino un intervalo que se ejecuta cada segundo, restando 1 segundo al tiempo restante
      const intervalo = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(intervalo);
      //si el tiempo se ha agotado y el juego ha empezado, muestro un mensaje de que se ha acabado el tiempo y fin de la partida
    } else if (juegoIniciado && tiempoRestante === 0) {
      if (!tarjetas.every((tarjeta) => tarjeta.encontrada)) {
        setMensaje("Se acabó el tiempo. Inténtalo de nuevo!");
        //paro el juego
        setJuegoIniciado(false);
      }
    }
  }, [juegoIniciado, tiempoRestante]);


  //creo un useEffect para comprobar si el juego ha terminado
  useEffect(() => {
    //si el juego ha empezado y todas las tarjetas están encontradas, muestro un mensaje de que has ganado
    if (juegoIniciado && tarjetas.every((tarjeta) => tarjeta.encontrada)) {
      setMensaje("Felicidades! Has ganado el juego");
      //paro el juego
      setJuegoIniciado(false);
    }
  }, [juegoIniciado, tarjetas]);


  //devuelvo el boton de iniciar el juego, el tiempo restante, los puntos y el total de clicks y grupo de tarjetas
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