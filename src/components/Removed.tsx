import { IonCol, IonGrid, IonIcon, IonRow } from "@ionic/react";
import React, { useContext } from "react";
import CarContext from "../context/CarContext";
import { Car } from "./types";
import CarCards from "./CarCards";
import { carSportSharp } from "ionicons/icons";

const Removed = () => {
  const { removedCars } = useContext(CarContext);

  // const [removedCars, setRemovedCars] = useState<Car[]>([]);
  // useEffect(() => {
  //   const storageRemovedCars = localStorage.getItem("removedCars");

  //   if (storageRemovedCars) {
  //     const parsedAvailableCars = JSON.parse(storageRemovedCars) as Car[];
  //     setRemovedCars(parsedAvailableCars);
  //   }
  // }, [localStorage.getItem("removedCars")]);

  return (
    <IonGrid>
      <IonRow className='main-content-row'>
        {removedCars.length === 0 && (
          <div className='empty-wrapper'>
            <IonIcon
              src={carSportSharp}
              className='empty-icon'
              color='danger'
            />
            Removed cars will be shown here
          </div>
        )}
        {removedCars?.map((car: Car, index: number) => {
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

export default Removed;
