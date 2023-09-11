import React, { useContext, useEffect } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonPopover,
  IonRow,
  IonText,
  IonToast,
} from "@ionic/react";
import CarContext from "../context/CarContext";
import { filterOutline } from "ionicons/icons";

import "./components.css";

const PopOver = () => {
  const [startYear, setStartYear] = React.useState(new Date().getFullYear());
  const [endYear, setEndYear] = React.useState(new Date().getFullYear());
  const [toastParams, setToastParams] = React.useState({
    isOpen: false,
    message: "",
    color: "",
  });
  const popoverRef = React.useRef<HTMLIonPopoverElement>(null);

  const { selectedYears, setSelectedYears } = useContext(CarContext);

  const showPopover = () => {
    const popover = popoverRef.current;
    if (popover) {
      popover.present();
    }
  };

  const hidePopover = () => {
    const popover = popoverRef.current;
    if (popover) {
      popover.dismiss();
    }
  };

  const resetYearParams = () => {
    setStartYear(new Date().getFullYear());
    setEndYear(new Date().getFullYear());
  };

  const resetContextYearParams = () => {
    setSelectedYears({
      startYear: 0,
      endYear: 0,
      oneYear: false,
      yearSelected: 0,
    });
  };

  const applyFilters = () => {
    hidePopover();
    if (endYear < startYear) {
      setToastParams({
        isOpen: true,
        message: "End year cannot be less than start year",
        color: "danger",
      });
    } else if (endYear === startYear) {
      setToastParams({
        isOpen: true,
        message: `only 1 year selected ${endYear}`,
        color: "success",
      });
      setSelectedYears({
        ...selectedYears,
        oneYear: true,
        yearSelected: endYear,
      });
    } else if (endYear > startYear) {
      setToastParams({
        isOpen: true,
        message: `Filter selected from ${startYear} to ${endYear}`,
        color: "success",
      });
      setSelectedYears({
        ...selectedYears,
        startYear,
        endYear,
      });
    }
    resetYearParams();
  };

  return (
    <div>
      <IonButton
        id='trigger-btn'
        onClick={showPopover}
        fill='clear'
        color='dark'
        className='filter-open-btn'
      >
        Filter by Year
        <IonIcon slot='end' icon={filterOutline} />
      </IonButton>
      <IonPopover
        trigger='trigger-btn'
        ref={popoverRef}
        animated
        backdropDismiss
        showBackdrop
      >
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                <div className='date-label-wrapper'>
                  <IonText>Start Year</IonText>
                </div>
                <IonDatetime
                  presentation='year'
                  onIonChange={(e: any) =>
                    setStartYear(new Date(e.detail.value).getFullYear())
                  }
                />
              </IonCol>
              <IonCol>
                <div className='date-label-wrapper'>
                  <IonText>End Year</IonText>
                </div>
                <IonDatetime
                  presentation='year'
                  onIonChange={(e: any) =>
                    setEndYear(new Date(e.detail.value).getFullYear())
                  }
                />
              </IonCol>
            </IonRow>
            <IonRow className='filter-btns-row'>
              <IonButton
                color='dark'
                fill='clear'
                onClick={resetContextYearParams}
              >
                Reset
              </IonButton>
              <IonButton color='dark' fill='clear' onClick={applyFilters}>
                Filter
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPopover>
      <IonToast
        isOpen={toastParams.isOpen}
        color={toastParams.color}
        onDidDismiss={() =>
          setToastParams({
            isOpen: false,
            message: "",
            color: "",
          })
        }
        message={toastParams.message}
        duration={2000}
      />
    </div>
  );
};

export default PopOver;
