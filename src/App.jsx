import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import "./styles.css";
import data from "./cardsData";
import styled from "styled-components";
export default function App() {
  // array con cada icono 
  const [cards, setCards] = useState(data);

  // array con cartas seleccionadas
  const [selectedCards, setSelectedCards] = useState([]);

  // booleano que cuando las cartas son iguales se vuelve true 
  const [gameWon, setGameWon] = useState(false);

  // Cantidad de intentos
  const [intentos, setIntentos] = useState(0);

  // Cuando selecciono 2 cartas se da medio segundo y luego se vuelven a dar vuelta
  // se vuelve a repetir cuando selectedCards cambia.
  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(checkCards, 500);
    }
  }, [selectedCards]);

  // Controlar que las cartas sean iguales
  const checkCards = () => {

    // defino dos cartas que voy a comparar
    const [firstCard, secondCard] = selectedCards;

    // comparo las 2 cartas
    if (firstCard.value === secondCard.value) {
      // defino una variable que determina que el juego termina
      let hasGameBeenWon = true;
      // verifico que cada carta esta dada vuelta, si no es asi el juego no termina todavia
      cards.forEach((card) => (card.flipped ? null : (hasGameBeenWon = false)));
      // si todas las cartas estan dadas vueltas, el juego termina
      setGameWon(hasGameBeenWon);

    } else {
      // si las cartas no coinciden las vuelvo a colocar en false
      const newCards = cards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          const newCard = { ...card, flipped: false };
          return newCard;
        } else {
          return card;
        }
      });
      // actualizo el set con las cartas de espalda otra vez
      setCards(newCards);
      // Agrego un intento
      setIntentos(intentos + 1);
    }
    // defino un array vacio para el proximo para de cartas
    setSelectedCards([]);
  };

  // metodo para dar vuelta las cartas, recibo el id de la carta clickeada
  const flipCard = (id) => {
    // defino un array con las cartas dadas vueltas y las que no
    const newCardData = cards.map((card) => {
      // busco la carta con el id verificando que no esta dada vuelta
      if (card.id === id && !card.flipped) {
        // le asigno el valor true a esa carta
        const newCard = { ...card, flipped: true };
        // agrego la carta al array que compara 2 cartas
        setSelectedCards([...selectedCards, newCard]);
        // devuelvo la carta dada vuelta
        return newCard;
      } else {
        // las cartas que no sean del mismo id vuelven como estan
        return card;
      }
    });
    // actualizo las cartas 
    setCards(newCardData);
  };

  // Empezar de nuevo
  const handleReset = () => {
    setGameWon(false)
    // doy vuelta a cada carta
    cards.map(card => card.flipped = false)
    // cambio el orden de las cartas
    setCards(cards.sort(() => Math.random() - 0.5))
    // vuelvo los intentos a cero
    setIntentos(0)
  }
  return (
    <div className="App">

      <Title>Memory fruit</Title>

      {gameWon ?
        <ScoreStyle> <span className="winner">👑 </span>Intentos totales: {intentos} </ScoreStyle>
        :
        <ScoreStyle>Intentos: {intentos}</ScoreStyle>
      }

      <GameBoard cards={cards} flipCard={flipCard} />

      {gameWon ?
        <ResetButton onClick={() => { handleReset() }}>Restart</ResetButton>
        :
        <Instructions>Gira dos cartas y encuentra los pares en la menor cantidad de intentos. Los intentos acertados no suman.</Instructions>
      }

    </div>
  );
}

const Title = styled.h1`
font-family: "Fredoka One", cursive;
font-size: 4rem;
color: white;
font-style: bold;
text-shadow: 2px 2px 3px rgb(80, 80, 80);
@media only screen and (max-width: 600px) {
  padding-top: 20px;
  font-size: 3rem;
}
`

const ScoreStyle = styled.h2`
font-family: "Fredoka One", cursive;
font-size: 3rem;
color: white;
font-style: bold;
text-shadow: 2px 2px 7px rgb(87, 86, 86);
@media only screen and (max-width: 600px) {
    font-size: 2rem;
}

.winner {
  animation: blinker 2s linear infinite;
}

`

const ResetButton = styled.button`
font-family: "Fredoka One", cursive;
margin: 30px 20px;
font-size: 1.5rem;
padding: 20px 30px;
background-color: white;
border-radius: 9999px;
border:none;
box-shadow: 2px 3px #888888;

&:hover {
  cursor: pointer;
  transform: translateY(-5px);
}
`
const Instructions = styled.div`
  color:white;
  font-size: 1.2rem;
  margin: 20px ;
  text-shadow: 2px 2px 7px rgb(87, 86, 86);
  padding: 20px 30px;
`