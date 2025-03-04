import { IFields } from "../types-and-interfaces/types"

export const fields: IFields = {
    Forecasts : [
        {
            id: "t2",
            name: "Temperature (C)",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "rh2",
            name: "Relative Humidity 2m (%)",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "wind",
            name: "Wind Speed (m/s)",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "rain",
            name: "Rainfall 1h (mm)",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "wind_vector",
            name: "Wind Particles",
            radioId: "radio2",
            layerType: "windLayer",
        },

    ],

    // Observations: [
    //     {
    //         id: "ncei_air_temp",
    //         name: "Temp NCEI (C)",
    //         radioId: "radio2"
    //     }
    // ],

    // "Fuel Stations": [
    //     {
    //         id: "ev",
    //         name: "Electric"
    //     },
    //     {
    //         id: "e85",
    //         name: "E85 Ethanol"
    //     },
    // ],

    Sociodemographics: [
        {
            id: "rpl_theme1",
            name: "Socioeconomic Status",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "rpl_theme2",
            name: "Household Characteristics",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "rpl_theme3",
            name: "Racial and Ethnic Minority Status",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "rpl_theme4",
            name: "Housing Type/Transportation",
            radioId: "radio1",
            layerType: "multiple",
        },
        {
            id: "rpl_themes",
            name: "Overall Summary",
            radioId: "radio1",
            layerType: "multiple",
        },
    ],
    // Boundaries: [
    //     {
    //         id: "IL_BNDY_State_Py",
    //         name: "Illinois State",
    //         radioId: "radio2",
    //         layerType: "polygon"
    //     }

    // ],

}
