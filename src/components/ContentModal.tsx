import React, {RefObject, useState} from "react";
import {IonModal, IonSearchbar} from "@ionic/react";

export interface ContentModalProps {
    modalRef: RefObject<HTMLIonModalElement>;
}

const ContentModal: React.FC<ContentModalProps> = ({ modalRef }) => {
    let [searchText, setSearchText] = useState("");
    let [content, setContent] = useState(<p className="container">
        Wegen eines internen Streites über die nichtfunktionalen Anforderungen dieser Komponente,
        können aktuell noch keine Orte gesucht werden...
    </p>);

    window.popupSearchState = searchText;
    window.setPopupSearchState = (value) => {
        window.popupSearchState = value;
        setSearchText(value);
    };

    window.popupContentState = content;
    window.setPopupContentState = (element) => {
        window.popupContentState = element;
        setContent(element);
    };

    return (
        <IonModal
            ref={modalRef}
            isOpen={true}
            initialBreakpoint={0.1}
            breakpoints={[0.1, 0.5, 0.95]}
            backdropBreakpoint={0.5}
            canDismiss={false}
            onIonBreakpointDidChange={async () => {
                // disable this temporarily
                return;

                if (await modalRef.current?.getCurrentBreakpoint() === 0.1) {
                    window.selectedLeafletElement.setStyle({fillColor: 'green', color: 'green'})
                    window.setPopupContentState(<p className="container">Wähle ein Gebäude aus...</p>)
                }
            }}
            slot="fixed">
            {/*<IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}
                          showCancelButton="focus" cancelButtonText="Abbrechen"
                          className={"searchbar"}></IonSearchbar>*/}
            { content }
        </IonModal>
    )
}

export default ContentModal;