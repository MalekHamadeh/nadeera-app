import React, { createContext, useEffect, useState } from "react";
import { Car } from "../components/types";

interface CarContextProps {
  availableCars: Car[];
  boughtCars: Car[];
  removedCars: Car[];
  filteredCars: Car[];
  selectedYears: {
    startYear: number;
    endYear: number;
    oneYear: boolean;
    yearSelected: number;
  };
  selectedFilter: boolean;
  buyCar: (carIndex: number) => void;
  removeCar: (carIndex: number) => void;
  returnToAvailable: (carIndex: number, pathName: string) => void;
  setSelectedYears: (years: {
    startYear: number;
    endYear: number;
    oneYear: boolean;
    yearSelected: number;
  }) => void;
}

interface CarProviderProps {
  children: React.ReactNode;
}

const CarContext = createContext<CarContextProps>({} as CarContextProps);

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "Camaro",
      description: "Fall into natural body of water striking water surface",
      model: "Chevrolet",
      year: 1980,
    },
    {
      id: 2,
      name: "Sierra 3500",
      description: "Otitis media in diseases classified elsewhere, right ear",
      model: "GMC",
      year: 2012,
    },
    {
      id: 3,
      name: "Ram 3500",
      description: "Nondisp unsp condyle fx low end l femr, 7thB",
      model: "Dodge",
      year: 2002,
    },
    {
      id: 4,
      name: "Caravan",
      description: "Burn of third degree of lip(s), subsequent encounter",
      model: "Dodge",
      year: 2002,
    },
    {
      id: 5,
      name: "Tucson",
      description: "Other injury of bronchus, unilateral, subsequent encounter",
      model: "Hyundai",
      year: 2008,
    },
    {
      id: 6,
      name: "NSX",
      description: "Allergy status to analgesic agent status",
      model: "Acura",
      year: 1998,
    },
    {
      id: 7,
      name: "2500 Club Coupe",
      description: "Melanoma in situ of anal skin",
      model: "GMC",
      year: 1992,
    },
    {
      id: 8,
      name: "riolet",
      description: "Lac w/o fb of abd wall, unsp q w/o penet perit cav, subs",
      model: "Audi",
      year: 1994,
    },
  ]);

  const [availableCars, setAvailableCars] = useState([] as Car[]);
  const [boughtCars, setBoughtCars] = useState([] as Car[]);
  const [removedCars, setRemovedCars] = useState([] as Car[]);
  const [filteredCars, setFilteredCars] = useState([] as Car[]);
  const [selectedYears, setSelectedYears] = useState({
    startYear: 0,
    endYear: 0,
    oneYear: false,
    yearSelected: 0,
  });

  const [selectedFilter, setSelectedFilter] = useState(false);

  useEffect(() => {
    setAvailableCars([...cars]);
  }, [cars]);

  // useEffect(() => {
  //   localStorage.setItem("availableCars", JSON.stringify(availableCars));
  //   localStorage.setItem("boughtCars", JSON.stringify(boughtCars));
  //   localStorage.setItem("removedCars", JSON.stringify(removedCars));
  // }, [availableCars, boughtCars, removedCars]);

  useEffect(() => {
    if (selectedYears.startYear === 0 && selectedYears.endYear === 0) {
      resetAvailableCars();
      setSelectedFilter(false);
    }
    if (selectedYears.oneYear) {
      console.log("filter by one Year");
      filterCarsByOneYear();
      setSelectedFilter(true);
    }
    if (selectedYears.startYear > 0 && selectedYears.endYear > 0) {
      console.log("filter by start end years");
      filterCarsByRange();
      setSelectedFilter(true);
    }
  }, [selectedYears]);

  const filterCarsByOneYear = () => {
    const filteredCarsArray: Car[] = availableCars.filter(
      (car) => car.year === selectedYears.yearSelected
    );
    setFilteredCars(filteredCarsArray);
  };

  const filterCarsByRange = () => {
    const filteredCarsArray: Car[] = availableCars.filter(
      (car) =>
        car.year >= selectedYears.startYear && car.year <= selectedYears.endYear
    );

    setFilteredCars(filteredCarsArray);
  };

  const resetAvailableCars = () => {
    setFilteredCars([]);
  };

  const buyCar = (carIndex: number) => {
    let carToBuy: Car = {
      id: 0,
      model: "",
      description: "",
      name: "",
      year: 0,
    };

    if (carIndex >= 0 && carIndex < removedCars.length) {
      const updatedRemovedCars: Car[] = [...removedCars]; // Create a copy of the removedCars array
      updatedRemovedCars.splice(carIndex, 1);
      carToBuy = removedCars.splice(carIndex, 1)[0]; // Remove the car at the specified index
      setRemovedCars(updatedRemovedCars);
    } else if (carIndex >= 0 && carIndex < availableCars.length) {
      carToBuy = availableCars.splice(carIndex, 1)[0];
    } else {
      console.log("Invalid car index.");
      return;
    }

    setBoughtCars([...boughtCars, carToBuy]);
  };

  const removeCar = (carIndex: number) => {
    let carToRemove: Car = {
      id: 0,
      model: "",
      description: "",
      name: "",
      year: 0,
    };

    if (carIndex >= 0 && carIndex < boughtCars.length) {
      const updatedBoughtCars: Car[] = [...boughtCars]; // Create a copy of the removedCars array
      updatedBoughtCars.splice(carIndex, 1);
      carToRemove = boughtCars.splice(carIndex, 1)[0]; // Remove the car at the specified index
      setBoughtCars(updatedBoughtCars);
    } else if (carIndex >= 0 && carIndex < availableCars.length) {
      carToRemove = availableCars.splice(carIndex, 1)[0];
    } else {
      console.log("Invalid car index.");
      return;
    }

    setRemovedCars([...removedCars, carToRemove]);
  };

  const returnToAvailable = (carIndex: number, pathName: string) => {
    let carToReturn: Car = {
      id: 0,
      model: "",
      description: "",
      name: "",
      year: 0,
    };

    if (pathName === "/bought") {
      if (carIndex >= 0 && carIndex < boughtCars.length) {
        const updatedBoughtCars: Car[] = [...boughtCars];
        updatedBoughtCars.splice(carIndex, 1);
        carToReturn = boughtCars.splice(carIndex, 1)[0];
        setBoughtCars(updatedBoughtCars);
      }
    } else if (pathName === "/removed") {
      if (carIndex >= 0 && carIndex < removedCars.length) {
        const updatedRemovedCars: Car[] = [...removedCars];
        updatedRemovedCars.splice(carIndex, 1);
        carToReturn = removedCars.splice(carIndex, 1)[0];
        setBoughtCars(updatedRemovedCars);
      }
    }

    setAvailableCars([...availableCars, carToReturn]);
  };

  return (
    <CarContext.Provider
      value={{
        availableCars,
        boughtCars,
        removedCars,
        filteredCars,
        selectedYears,
        selectedFilter,
        buyCar,
        removeCar,
        returnToAvailable,
        setSelectedYears,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
