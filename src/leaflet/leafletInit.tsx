import L from "leaflet";
import "leaflet-edgebuffer";

import "../gloalDeclarations";

declare global {
    namespace L {
        // noinspection JSUnusedGlobalSymbols
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

window.map.on('preclick', () => {
    if (window.selectedLeafletElement) {
        window.selectedLeafletElement.setStyle({
            color: 'green',
            fillColor: 'green'
        })
    }

    window.setPopupContentState(<p className="container">Wähle ein Gebäude aus...</p>)
});

document.getElementById('map')?.classList.add("initialized");
