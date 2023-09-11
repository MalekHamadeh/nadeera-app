export interface Car {
  id: number;
  name: String;
  description: String;
  model: String;
  year: number;
}

export interface CarCardsProps {
  car: Car;
  carIndex: number;
}
