import React, {createRef} from "react";
import {IonContent, IonPage} from '@ionic/react';
import MapContainer from '../components/MapContainer';

import './Home.css';
import { DataLoad } from "../components/LoadProgress";
import ContentModal from "../components/ContentModal";

import "../gloalDeclarations"

const Home: React.FC = () => {
    window.modal = createRef<HTMLIonModalElement>();
    window.modalComponent = <ContentModal modalRef={window.modal}></ContentModal>;

    return (
        <IonPage>
            <IonContent fullscreen slot="fixed">
                <MapContainer>
                    {window.modalComponent}
                </MapContainer>

                <DataLoad></DataLoad>
            </IonContent>
        </IonPage>
    );
};

export default Home;
