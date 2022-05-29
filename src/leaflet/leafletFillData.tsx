import L, { LatLng, LeafletEvent } from 'leaflet';
import { KITBuilding, OSMNode, OSMWay } from "../data/types";
import { data } from "../data/data.mjs";
import "../gloalDeclarations";
import PlaceDetails from "../components/PlaceDetails";

interface osmLibrary {
    nodeLibrary: {
        [key: number]: OSMNode
    },
    wayLibrary: {
        [key: number]: OSMWay
    }
}

export function init(osmData: osmLibrary) {
    for (const building of data.buildings) {
        for (const wayId of building.outlineWayIds) {
            let vertices = [];

            for (const nodeId of osmData.wayLibrary[wayId].nodes) {
                const node = osmData.nodeLibrary[nodeId];
                vertices.push(new LatLng(node.lat, node.lon));
            }

            let polygon = L.polygon(vertices, {
                color: 'green',
                fillColor: 'green',
                fillOpacity: 0.1,
            }).addTo(window.map);

            polygon.on('click', event => {
                if (window.selectedLeafletElement) {
                    window.selectedLeafletElement.setStyle({color: 'green', fillColor: 'green'});
                }

                window.selectedLeafletElement = polygon;
                polygon.setStyle({color: 'orange', fillColor: 'orange'});

                handlePopup(event, building);
            });
        }
    }
}

function handlePopup(event: LeafletEvent, building: KITBuilding) {
    if (!window.modal?.current) return;
    const modal = window.modal.current!;

    modal.setCurrentBreakpoint(0.5).then(ignored => {});

    window.setPopupContentState(<PlaceDetails building={building} />);
}
