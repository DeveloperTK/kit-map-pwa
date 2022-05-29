import fetch from "node-fetch";
import fs from 'fs';

import { data } from "./data.mjs";

let promises = {};

let nodeLibrary = {};
let wayLibrary = {};

async function fetchWay(wayId) {
    promises[wayId] = this;

    let result = await fetch("https://www.openstreetmap.org/api/0.6/way/" + wayId + "/full.json")
        .then(res => res.json());

    for (const element of result.elements) {
        switch (element.type) {
            case "node":
                nodeLibrary[element.id] = element;
                break;
            case "way":
                wayLibrary[element.id] = element;
                break;
            default:
                throw "OpenStreetMap API element of unknown type";
        }
    }
}

function output(stringData) {
    fs.writeFileSync("./map-dataset-" + Date.now() + ".json", stringData);
    console.log("\nfinished in: " + process.uptime() + "ms");
}

export async function generate() {
    console.info("fetching data...");

    for (const building of data.buildings) {
        console.info("- - building: " + building.id);
        for (const osmWayId of building.outlineWayIds) {
            console.info("- - - way: " + osmWayId);
            if (!wayLibrary[osmWayId]) {
                await fetchWay(osmWayId);
            }
        }
    }

    console.log("saving data...");

    Promise.all(Object.values(promises)).then(() =>
        output(
            JSON.stringify(
                { nodeLibrary: nodeLibrary, wayLibrary: wayLibrary }
            )
        )
    );
}

if (process.env.GENERATE) {
    generate().then();
}
