import React, { useContext } from "react";
import { CarCardsProps } from "./types";
import { IonButton, IonCard, IonIcon } from "@ionic/react";
import {
  cartOutline,
  trashBinOutline,
  returnUpBackOutline,
} from "ionicons/icons";
import CarContext from "../context/CarContext";
import { useLocation } from "react-router";

import "./components.css";

const CarCards: React.FC<CarCardsProps> = ({ car, carIndex }) => {
  const { buyCar, removeCar, returnToAvailable } = useContext(CarContext);
  const location = useLocation();

  return (
    <IonCard className='card'>
      <div>
        <h4>Name: {car.name}</h4>
        <h4>Description: {car.description}</h4>
        <h4>Model: {car.model}</h4>
        <h4>Year: {car.year}</h4>
      </div>
      <div className='buttons-wrapper'>
        {location.pathname === "/bought" ? (
          <IonButton color={"medium"} className='button' disabled>
            <IonIcon icon={cartOutline} />
          </IonButton>
        ) : (
          <IonButton
            color={"success"}
            className='button'
            onClick={() => buyCar(carIndex)}
          >
            <IonIcon icon={cartOutline} />
          </IonButton>
        )}

        {(location.pathname === "/bought" ||
          location.pathname === "/removed") && (
          <IonButton
            color={"dark"}
            className='button'
            onClick={() => returnToAvailable(carIndex, location.pathname)}
          >
            <IonIcon icon={returnUpBackOutline} />
          </IonButton>
        )}

        {location.pathname === "/removed" ? (
          <IonButton color={"medium"} className='button' disabled>
            <IonIcon icon={trashBinOutline} />
          </IonButton>
        ) : (
          <IonButton
            color={"danger"}
            className='button'
            onClick={() => removeCar(carIndex)}
          >
            <IonIcon icon={trashBinOutline} />
          </IonButton>
        )}
      </div>
    </IonCard>
  );
};

export default CarCards;
