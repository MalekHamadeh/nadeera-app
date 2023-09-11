import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import React, { useContext } from "react";
import CarContext from "../context/CarContext";
import { Car } from "./types";
import CarCards from "./CarCards";
import { carSportSharp } from "ionicons/icons";

const Bought = () => {
  const { boughtCars } = useContext(CarContext);
  // const [boughtCars, setBoughtCars] = useState<Car[]>([]);
  // useEffect(() => {
  //   const storageBoughtCars = localStorage.getItem("boughtCars");

  //   if (storageBoughtCars) {
  //     const parsedAvailableCars = JSON.parse(storageBoughtCars) as Car[];
  //     setBoughtCars(parsedAvailableCars);
  //   }
  // }, [localStorage.getItem("boughtCars")]);

  return (
    <IonGrid>
      <IonRow className='main-content-row'>
        {boughtCars.length === 0 && (
          <div className='empty-wrapper'>
            <IonIcon
              src={carSportSharp}
              className='empty-icon'
              color='success'
            />
            Bought cars will be shown here
          </div>
        )}
        {boughtCars?.map((car: Car, index: number) => {
          return (
            <IonCol key={index}>
              <CarCards car={car} carIndex={index} />
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
};

export default Bought;
