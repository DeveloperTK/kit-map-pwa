import React, {createContext, useContext, useEffect} from "react";
import { Map } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import './MapContainer.css';

const MapContext = createContext<Map | null>(null);

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Window { map: Map }
}

const MapContainer: React.FC = ({ children }) => {
    let value: Map | null = null;

    if (window) {
        value = window.map;
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <MapContext.Provider value={value}>
            <div id="map"></div>

            { children }
        </MapContext.Provider>
    )
}

function init() {
    if (!document.getElementById('map')?.classList.contains("dispatched")) {
        document.getElementById('map')?.classList.add("dispatched");

        import('../leafletInit');
    }
}

export function useMap() {
    return useContext(MapContext);
}

export default MapContainer;