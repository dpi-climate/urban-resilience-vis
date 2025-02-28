import { IFields } from "../types-and-interfaces/types"

export const fields: IFields = {
    Forecasts : [
        {
            id: "no2",
            name: "NO2 (ppbv)"
        },
        {
            id: "o3",
            name: "O3 (ppbv)"
        },
        {
            id: "pm10",
            name: "PM10 (ppbv)"
        },
        {
            id: "pm25",
            name: "PM2.5 (ug/m³)"
        },
        {
            id: "co",
            name: "CO (ppb)"
        },
        {
            id: "t2",
            name: "T2m (C)"
        }
    ],

    Observations: [
        {
            id: "ncei_air_temp",
            name: "Temp NCEI (C)"
        }
    ],

    "Fuel Stations": [
        {
            id: "ev",
            name: "Electric"
        },
        {
            id: "e85",
            name: "E85 Ethanol"
        },
    ]
}
