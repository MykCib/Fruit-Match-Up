export interface ICard {
  id: number;
  image: string;
  matched: boolean;
}

export interface ICards extends Array<ICard> {}

export interface Props {
  card: {
    id: number;
    image: string;
    matched: boolean;
  };
  id: number;
  handleChoice: Function;
  flipped: boolean;
  disabled: boolean;
}
