import { IFields } from "../types-and-interfaces/types"

export const fields: IFields = {
    Forecasts : [
        {
            id: "t2",
            name: "Temperature (C)"
        },
        // {
        //     id: "co",
        //     name: "CO"
        // },
        // {
        //     id: "p25",
        //     name: "PM2.5 (ug/m³)"
        // },
        {
            id: "rh2",
            name: "Relative Humidity 2m (%)"
        },

    ],

    // Observations: [
    //     {
    //         id: "ncei_air_temp",
    //         name: "Temp NCEI (C)"
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
            name: "Socioeconomic Status"
        },
        {
            id: "rpl_theme2",
            name: "Household Characteristics"
        },
        {
            id: "rpl_theme3",
            name: "Racial and Ethnic Minority Status"
        },
        {
            id: "rpl_theme4",
            name: "Housing Type/Transportation"
        },
        {
            id: "rpl_themes",
            name: "Overall Summary"
        },

    ]
}
