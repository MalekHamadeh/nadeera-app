import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./pages.css";
import Home from "../components/Home";

const HomePage: React.FC = () => {
  const cars = {
    name: String,
    description: String,
    module: String,
    year: Date,
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content-wrapper'>
          <Home />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
