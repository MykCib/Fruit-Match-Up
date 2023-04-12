import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import { ICard, ICards } from "./interfaces";
import { DiGithubBadge } from "react-icons/di";

const cardImages = [
  { image: "🥝", matched: false },
  { image: "🥑", matched: false },
  { image: "🍉", matched: false },
  { image: "🍊", matched: false },
  { image: "🍌", matched: false },
  { image: "🍒", matched: false },
];

function App() {
  const [cards, setCards] = useState<ICards>();
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<ICard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<ICard | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [highscore, setHighsore] = useState("0");

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    if (cards) {
      const res = cards.filter((card) => card.matched);
      if (res.length === 12) {
        if (Number(highscore) === 0 || turns < Number(highscore)) {
          localStorage.setItem("highscore", JSON.stringify(turns));
          setHighsore(String(turns));
        }
      }
    }

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // compare two choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
    }
    if (choiceOne && choiceTwo) {
      if (choiceOne.image === choiceTwo.image) {
        setCards((prevCards) => {
          return prevCards?.map((card) => {
            if (card.image === choiceOne.image) {
              return {
                ...card,
                matched: true,
              };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("highscore") || "0");
    setHighsore(storage);
  }, []);

  // handle a choice
  const handleChoice = (card: ICard) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Fruit Match-Up</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => (
            <SingleCard
              card={card}
              id={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
      </div>
      <p>Turns: {turns}</p>
      <p>Highscore: {highscore}</p>
      <div className="github">
        <a href="https://github.com/MykCib/Fruit-Match-Up">
          <DiGithubBadge />
        </a>
      </div>
    </div>
  );
}

export default App;
