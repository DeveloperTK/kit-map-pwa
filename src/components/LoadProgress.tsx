import React, { createRef, useEffect, useState } from "react";
import { IonToast } from "@ionic/react";
import AsyncLock from 'async-lock';
import "../gloalDeclarations";

const lock = new AsyncLock();

export const DataLoad: React.FC = () => {
    let [open, setOpen] = useState(true);
    let toast = createRef<HTMLIonToastElement>();

    useEffect(() => {
        lock.acquire(
            'dataFetchStatus',
            () => initLoad(toast),
            {}
        ).then();
    }, [toast]);

    return (
        <IonToast isOpen={open} onDidDismiss={() => setOpen(false)} position="top" ref={toast}
                  message="Lädt Informationen..." />
    )
}

function initLoad(toast: React.RefObject<HTMLIonToastElement>) {
    if (window.startedFetch) {
        return;
    } else {
        window.startedFetch = true
    }

    fetch('/map-dataset-current.json').then(res => res.json()).then(data => {
        import('../leaflet/leafletFillData').then(r => {
            r.init(data);
            toast.current?.dismiss();
        });
    });
}