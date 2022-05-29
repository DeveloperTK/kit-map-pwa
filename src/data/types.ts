export interface OSMTag {
    key: string;
    value: string;
}

export interface OSMIdentifiable {
    id: number;
    type?: string;
}

export interface OSMChangeable extends OSMIdentifiable {
    timestamp: string;
    version: number;
    changeset: number;
    user: string;
    uid: number;
}

export interface OSMNode extends OSMChangeable {
    lat: number;
    lon: number;
}

export interface OSMWay extends OSMChangeable {
    nodes: number[];
    tags: OSMTag[];
}

export interface OSMRelationMember {
    type: string;
    ref: number;
    role: string;
}

export interface OSMRelation extends OSMChangeable {
    members: OSMRelationMember[];
    tags: OSMTag[];
}

export interface KITBuilding {
    outlineWayIds: number[];
    id: string;
    officialName: string;
    otherNames: string[];
    url?: string;
}

export interface KITPointOfInterest {
    nodeId: number;
    officialName: string;
    otherNames: string[];
}
