import React from "react";
import Card from "./Card";
import styled from 'styled-components'

export default function GameBoard({ cards, flipCard }) {
    return (
        <Board>
            {cards.map((card) => (
                <Card
                    flipped={card.flipped}
                    flipCard={flipCard}
                    value={card.value}
                    id={card.id}
                    key={card.id}
                />
            ))}
        </Board>
    );
}

const Board = styled.div`
    width: 100%;
    max-width: 640px;
    margin: 20px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 10px;
    @media only screen and (max-width: 600px) {
        padding: 1px;
    }
`