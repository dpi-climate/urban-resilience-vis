export type Anchor = 'top' | 'left' | 'bottom' | 'right'
export type TField = { id: string, name: string, group?: string }
export type TFieldGroup = "Forecasts" | "Observations"
export type TMode = "single" | "side-by-side" | "split"
export type TModeOption = { id: TMode, name: string }