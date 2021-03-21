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
    setOnOverlay(!onOverlay)

    setGameWon(false)
    // doy vuelta a cada carta
    cards.map(card => card.flipped = false)
    // cambio el orden de las cartas
    setCards(cards.sort(() => Math.random() - 0.5))
    // vuelvo los intentos a cero
    setIntentos(0)

    setTimeout(() => setBoton(!boton), 3000)

  }

  // manejo el overlay con true y false 
  const [onOverlay, setOnOverlay] = useState(false)
  // 
  const [boton, setBoton] = useState(true)

  // cuando la pagina carga por primera vez aparace el overlay por 3seg
  useEffect(() => {
    setTimeout(() => setOnOverlay(!onOverlay), 2000)
  }, []);

  // cuando el usuario reinicia el juego le aparece un boton para empezar
  const handleOverlayButton = () => {
    setOnOverlay(!onOverlay)
    setTimeout(() => setBoton(!boton), 2000)
    console.log(onOverlay)
  }

  return (
    <AppContainer>
      <div className="overlay" style={{ display: onOverlay ? "none" : "block" }} >
        <div class="box">
          <Title style={{ display: boton ? "block" : "none" }}  > Cargando ...</Title>
          <ResetButton style={{ display: boton ? "none" : "block" }} onClick={() => handleOverlayButton()}>Empezar</ResetButton>
        </div>
      </div>

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
      <div>
        <a style={{ color: "white" }} href="https://github.com/solisjoaquin/memoryfruit">Github</a>
      </div>
    </AppContainer>
  );
}
const AppContainer = styled.div`
font-family: sans-serif;
text-align: center;
display: flex;
padding-bottom: 100px;
flex-direction: column;
justify-content: center;
align-items: center;
background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://www.xtrafondos.com/wallpapers/fall-guys-ultimate-knockout-6204.jpg");
background-size: cover;
background-position: center;
background-repeat: no-repeat;
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); 
  z-index: 2;
  cursor: pointer;
  .box {
    position:fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
`
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); 
  z-index: 2;
  cursor: pointer;

  .box {
    position:fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const Title = styled.h1`
font-family: "Fredoka One", cursive;
font-size: 4rem;
color: white;
font-style: bold;
padding-bottom:20px;
padding-top:10px;
text-shadow: 3px 3px 4px #f73ba1;
@media only screen and (max-width: 600px) {
  padding-top: 20px;
  font-size: 3rem;
  padding-bottom:10px;
}
`

const ScoreStyle = styled.h2`
font-family: "Fredoka One", cursive;
font-size: 3rem;
color: white;
font-style: bold;
text-shadow: 2px 2px 4px #396c9d;
@media only screen and (max-width: 600px) {
    font-size: 2rem;
}

.winner {
  animation: blinker 2s linear infinite;
}

`

const ResetButton = styled.button`
font-family: "Fredoka One", cursive;
margin: 30px 30px;
font-size: 1.5rem;
padding: 20px 30px;
background-color: white;
border-radius: 9999px;
border:none;
box-shadow: 2px 3px #2fd7dc;

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