import React, { useContext, useEffect, useState } from "react";
import { Car } from "./types";
import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import CarCards from "./CarCards";
import CarContext from "../context/CarContext";

import PopOver from "./PopOver";
import "./components.css";

const Home = () => {
  const { availableCars, filteredCars, selectedFilter } =
    useContext(CarContext);
  const [sortedAvailableCars, setSortedAvailableCars] = useState<Car[]>([]);
  const [sortedFilteredCars, setSortedFilteredCars] = useState<Car[]>([]);

  // const [availableCars, setAvailableCars] = useState<Car[]>([]);
  // useEffect(() => {
  //   const storageAvailableCars = localStorage.getItem("availableCars");

  //   if (storageAvailableCars) {
  //     const parsedAvailableCars = JSON.parse(storageAvailableCars) as Car[];

  //     if (parsedAvailableCars.length > 0) {
  //       const sortedCars = parsedAvailableCars.sort((a, b) => a.year - b.year);

  //       setAvailableCars(sortedCars);
  //     }
  //   }
  // }, [localStorage.getItem("availableCars")]);

  useEffect(() => {
    if (availableCars.length > 0) {
      const parsedAvailableCars = availableCars.sort((a, b) => a.year - b.year);
      setSortedAvailableCars(parsedAvailableCars);
    }

    if (filteredCars.length > 0) {
      const parsedFilteredCars = filteredCars.sort((a, b) => a.year - b.year);
      setSortedFilteredCars(parsedFilteredCars);
    }
  }, [availableCars, filteredCars]);

  return (
    <IonGrid>
      <IonRow className='filter-row'>
        <IonCol className='filter-col'>
          <PopOver />
        </IonCol>
      </IonRow>
      <IonRow className='main-content-row'>
        {selectedFilter ? (
          filteredCars?.length > 0 ? (
            sortedFilteredCars.map((car: Car, index: number) => {
              return (
                <IonCol key={index}>
                  <CarCards carIndex={index} car={car} />
                </IonCol>
              );
            })
          ) : (
            <IonCol>
              <IonText color={"danger"}>
                No cars available with the selected filter
              </IonText>
            </IonCol>
          )
        ) : (
          sortedAvailableCars?.map((car: Car, index: number) => {
            return (
              <IonCol key={index}>
                <CarCards carIndex={index} car={car} />
              </IonCol>
            );
          })
        )}
      </IonRow>
    </IonGrid>
  );
};

export default Home;
