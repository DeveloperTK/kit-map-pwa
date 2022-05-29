import {RefObject} from "react";
import { Map } from "leaflet";

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Window {
        map: Map;
        modal: RefObject<HTMLIonModalElement>;
        modalComponent: JSX.Element;
        startedFetch: boolean;

        selectedLeafletElement: L.Polygon | L.Circle;

        popupSearchState: string;
        setPopupSearchState: (value: string) => void;

        popupContentState: JSX.Element;
        setPopupContentState: (value: JSX.Element) => void;
    }
}

export default interface AppState {
    map?: Map;
    modal?: RefObject<HTMLIonModalElement>;
    modalComponent?: JSX.Element;
    startedFetch?: boolean;
}