import L, { Map } from "leaflet";
import "leaflet-edgebuffer";

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Window { map: Map }
}

declare global {
    namespace L {
        interface TileLayerOptions {
            edgeBufferTiles?: number
        }
    }
}

window.map = L.map('map', {
    minZoom: 9,
    maxBoundsViscosity: 1.0,
}).setView([49.01482120086453, 8.420516252517702], 18);

// OpenStreetMap - Street Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Kartendaten © OpenStreetMap',
    detectRetina: true,
    edgeBufferTiles: 2
}).addTo(window.map);

L.control.attribution({
    position: "topright"
}).addTo(window.map);

document.getElementById('map')?.classList.add("initialized");
