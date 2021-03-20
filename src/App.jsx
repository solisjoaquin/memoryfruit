import React, { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import "./styles.css";
import data from "./cardsData";
import styled from "styled-components";
export default function App() {

  const [cards, setCards] = useState(data);
  const [selectedCards, setSelectedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [intentos, setIntentos] = useState(0);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setTimeout(checkCards, 500);
    }
  }, [selectedCards]);

  const checkCards = () => {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.value === secondCard.value) {
      let hasGameBeenWon = true;
      cards.forEach((card) => (card.flipped ? null : (hasGameBeenWon = false)));
      setGameWon(hasGameBeenWon);
    } else {
      const newCards = cards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          const newCard = { ...card, flipped: false };
          return newCard;
        } else {
          return card;
        }
      });
      setCards(newCards);
      setIntentos(intentos + 1);
    }

    setSelectedCards([]);
  };
  const flipCard = (id) => {
    const newCardData = cards.map((card) => {
      if (card.id === id && !card.flipped) {
        const newCard = { ...card, flipped: true };
        setSelectedCards([...selectedCards, newCard]);
        return newCard;
      } else {
        return card;
      }
    });

    setCards(newCardData);
  };

  const handleReset = () => {
    setGameWon(false)
    cards.map(card => card.flipped = false)
    setCards(cards.sort(() => Math.random() - 0.5))
    setIntentos(0)
  }
  return (
    <div className="App">
      <Title>Memory fruit</Title>
      {gameWon ? <ScoreStyle> <span className="winner">👑 </span>Intentos totales: {intentos} </ScoreStyle> : <ScoreStyle>Intentos: {intentos}</ScoreStyle>}

      <GameBoard cards={cards} flipCard={flipCard} />
      {gameWon ? <ResetButton onClick={() => { handleReset() }}>Restart</ResetButton> :
        <Instructions>Gira dos cartas y encuentra los pares en la menor cantidad de intentos. Los intentos acertados no suman.</Instructions>}

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