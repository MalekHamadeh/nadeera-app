import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./pages.css";
import Removed from "../components/Removed";

const RemovedPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content-wrapper'>
          <Removed />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RemovedPage;
