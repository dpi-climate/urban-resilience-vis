export type Anchor = 'top' | 'left' | 'bottom' | 'right'
export type TFieldGroup = "Forecasts" | "Observations"
export type TField = { id: string, name: string }
export type TMode = "single" | "side-by-side" | "split"
export type TModeOption = { id: TMode, name: string }

export interface IFields { [key: string]: TField[] }