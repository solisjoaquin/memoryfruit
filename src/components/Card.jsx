import React from "react";
import styled from 'styled-components'

export default function Card({ flipped, value, flipCard, id }) {
    return (
        <CardStyle onClick={() => { flipCard(id); }} key={id} >
            <div
                className="card-inner"
                style={{ transform: flipped ? "rotateY(180deg)" : null }}
            >
                <div className="card-back">{value}</div>
                <div className="card-front"></div>
            </div>
        </CardStyle>
    );
}

const CardStyle = styled.div`

    background-color: transparent;
    width: 100px;
    height: 100px;
    perspective: 1000px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.6s;
        transform-style: preserve-3d;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
      }
      
    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
    }
      
    .card-front {
        background-image: linear-gradient(
        141deg,
        #a56fbb 0%,
        #7777e5 51%,
        #6e70dd 75%
        );
        color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
    }
      
    .card-back {
        background-image: radial-gradient(#e8b047 40%, #f9f071 71%, #f8f894 85%);
        color: white;
        transform: rotateY(180deg);
      }

    @media only screen and (max-width: 600px) {
        width: 70px;
        height: 70px;
    }

`