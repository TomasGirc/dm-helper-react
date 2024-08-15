import { citySize, locationType, npcType, regionType } from "src/entities/types"

export const npcProxy: npcType[] = [{
    name: "Firstly",
    description: "First npc",
}]

export const locationProxy: locationType[] = [{
    _id: "1",
    name: "First location",
    description: "Location description 1",
},{
    _id: "2",
    name: "Second location",
    description: "Location description 2",
    npc: npcProxy
}]



export const regionProxy: regionType[] = [{
    _id: "1",
    name: "First region",
    locations: locationProxy,
    description: "Region description 1"
},{
    _id: "2",
    name: "Second region",
    locations: locationProxy,
    description: "Region description 2"
}]

export const sizeProxy: citySize[] = ["Village", "City" , "Capital"]