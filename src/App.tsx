import React, { useState } from "react";
import { Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  closeCircleSharp,
  homeSharp,
  arrowBackOutline,
  carSharp,
} from "ionicons/icons";
import BoughtPage from "./pages/BoughtPage";
import HomePage from "./pages/HomePage";
import RemovedPage from "./pages/RemovedPage";
import { CarProvider } from "./context/CarContext";
import NoMatch from "./pages/NoMatch";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <CarProvider>
          <IonMenu contentId='main-content' side='start' color='dark'>
            <IonHeader>
              <IonToolbar>
                <IonMenuToggle>
                  <IonButton fill='clear' color={"dark"}>
                    <IonIcon
                      icon={arrowBackOutline}
                      slot='icon-only'
                      color={"dark"}
                    />
                  </IonButton>
                </IonMenuToggle>
              </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
              <IonList>
                <IonMenuToggle autoHide={false}>
                  <IonItem routerLink='/bought'>
                    <IonIcon icon={carSharp} slot='start' />
                    <IonLabel>Bought Cars</IonLabel>
                  </IonItem>
                  <IonItem routerLink='/'>
                    <IonIcon icon={homeSharp} slot='start' />
                    <IonLabel>Home</IonLabel>
                  </IonItem>
                  <IonItem routerLink='/removed'>
                    <IonIcon icon={closeCircleSharp} slot='start' />
                    <IonLabel>Removed Cars</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>
          <IonPage id='main-content'>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot='start'>
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle>Nadeera App</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className='ion-padding'>
              <IonTabs>
                <IonRouterOutlet>
                  <Route component={BoughtPage} path={"/bought"} exact />
                  <Route component={RemovedPage} path={"/removed"} exact />
                  <Route component={HomePage} path={"/"} exact />
                  <Route component={NoMatch} />
                </IonRouterOutlet>
                <IonTabBar slot='bottom' selectedTab='/'>
                  <IonTabButton tab='/bought' href='/bought'>
                    <IonIcon aria-hidden='true' icon={carSharp} />
                    <IonLabel>Bought Cars</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab='/' href='/'>
                    <IonIcon aria-hidden='true' icon={homeSharp} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab='/removed' href='/removed'>
                    <IonIcon
                      aria-hidden='true'
                      icon={closeCircleSharp}
                    ></IonIcon>
                    <IonLabel>Removed Cars</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </IonContent>
          </IonPage>
        </CarProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
