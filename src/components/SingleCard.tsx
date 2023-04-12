import React from "react";
import "./SingleCard.css";
import { Props } from "../interfaces";

const SingleCard: React.FC<Props> = ({
  card,
  id,
  handleChoice,
  flipped,
  disabled,
}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div key={String(id)} className="card">
      <div className={flipped ? "flipped" : ""}>
        <span className="front">{card.image}</span>
        <span className="back" onClick={handleClick}>
          ❓
        </span>
      </div>
    </div>
  );
};

export default SingleCard;
