import React, {createRef, useState} from "react";
import {IonButton, IonContent, IonModal, IonPage, IonSearchbar} from '@ionic/react';
import MapContainer from '../components/MapContainer';
import './Home.css';

const Home: React.FC = () => {
    let [searchText, setSearchText] = useState("");
    const modalRef = createRef<HTMLIonModalElement>();

    return (
        <IonPage>
            <IonContent fullscreen slot="fixed">
                <MapContainer>
                    <IonModal
                        ref={modalRef}
                        isOpen={true}
                        initialBreakpoint={0.1}
                        breakpoints={[0.1, 0.5, 0.95]}
                        backdropBreakpoint={0.1}
                        canDismiss={false}
                        slot="fixed">
                        <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}
                                      showCancelButton="focus" cancelButtonText="Abbrechen"
                                      className={"searchbar"}></IonSearchbar>
                        <p className="container">
                            <IonButton onClick={() => modalRef.current?.setCurrentBreakpoint(0.1)}>!!</IonButton>
                        </p>
                    </IonModal>
                </MapContainer>
            </IonContent>
        </IonPage>
    );
};

export default Home;
