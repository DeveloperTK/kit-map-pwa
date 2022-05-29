import React from "react";
import {KITBuilding} from "../data/types";
import {
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonList,
    IonListHeader
} from "@ionic/react";

export interface PlaceDetailsProps {
    building: KITBuilding
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ building }) => {
    return (
        <>
            <IonCardContent>
                <IonCardSubtitle>{ building.id }</IonCardSubtitle>
                <IonCardTitle>{ building.officialName }</IonCardTitle>
            </IonCardContent>

            {
                building.otherNames.length > 0 ? <IonList>
                    <IonListHeader>Alternative Namen</IonListHeader>
                    {building.otherNames.map((name, index) => <IonItem key={index}>{name}</IonItem>)}
                </IonList> : ""
            }

            {
                building.url ? <IonList>
                    <IonListHeader>Sonstiges</IonListHeader>
                    <IonItem href={building.url} rel="noreferrer noopener" target="_system">Webseite</IonItem>
                </IonList> : ""
            }
        </>
    )
};

export default PlaceDetails;