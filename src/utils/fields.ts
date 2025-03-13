import { IFields } from "../types-and-interfaces/types"

export const fields: IFields = {
    Forecasts : [
        {
            id: "t2",
            name: "Temperature (C)",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "rh2",
            name: "Relative Humidity 2m (%)",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "rain",
            name: "Rainfall 1h (mm)",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "wind",
            name: "Wind Speed (m/s)",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "wind_vector",
            // id: "wdir10",
            name: "Wind Particles",
            radioId: "illinois_wind",
            layerType: "vector",
        },

    ],

    Observations: [
        {
            id: "ncei_temp",
            name: "Temperature NCEI (C)",
            radioId: "ncei",
            layerType: "scatter",
        },
        {
            id: "ncei_rh",
            name: "Relative Humidity NCEI (%)",
            radioId: "ncei",
            layerType: "scatter",
        }
    ],

    Sociodemographics: [
        {
            id: "rpl_theme1",
            name: "Socioeconomic Status",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "rpl_theme2",
            name: "Household Characteristics",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "rpl_theme3",
            name: "Racial and Ethnic Minority Status",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "rpl_theme4",
            name: "Housing Type/Transportation",
            radioId: "illinois",
            layerType: "multiple",
        },
        {
            id: "rpl_themes",
            name: "Overall Summary",
            radioId: "illinois",
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
