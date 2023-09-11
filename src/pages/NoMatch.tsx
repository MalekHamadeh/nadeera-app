import { IonContent, IonPage } from "@ionic/react";
import React from "react";

const NoMatch = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='content-wrapper'>
          <div className='not-found-content'>
            <h1>404 NOT FOUND</h1>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NoMatch;
