import { TField } from "../types-and-interfaces/types"
import { fields } from "./fields"

export function findFieldById(targetId: string) {
    for (const key in fields) {
      const field = fields[key].find((item: TField) => item.id === targetId)
      if (field) {
        return field
      }
    }
    return null
  }