import { citySize, commentType, locationType, npcType, regionType } from "src/entities/types"

export const npcProxy: npcType[] = [{
    name: "Firstly",
    description: "First npc",
    locations: [],
    region: [],
    quest: [],
    comment: []
}]

export const locationProxy: locationType = {
    _id: "1",
    name: "First location",
    description: "Location description 1",
    npc: [],
    top: 0,
    left: 0,
    image: "",
    quest: [],
    region: {
        _id: undefined,
        name: "",
        locations: [],
        npc: [],
        description: "",
        comment: [],
        image: undefined
    },
    comment: []
}

export const commentProxy: commentType = {
    author: {
        username: "",
        preferredName: "",
        image: undefined
    },
    comment: "",
    emoticon: ""
}



export const regionProxy: regionType = {
    _id: "1",
    name: "First region",
    locations: [locationProxy],
    description: "Region description 1",
    npc: [],
    comment: []
}

export const sizeProxy: citySize[] = ["Village", "City" , "Capital"]

export const rarityProxy = ["Miscalenious", "Common", "Rare", "Legendary"]

export const requirementProxy = ["Strength", "Dexterity", "Knowladge", "Influence"]

export const keywordProxy = ["Magic", "Wood", "Strength"]

export const itemTypeProxy = ["Sword", "Spear", "Gem", "Ring"]