import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import "./pages.css";
import Bought from "../components/Bought";

const BoughtPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content-wrapper'>
          <Bought />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BoughtPage;
