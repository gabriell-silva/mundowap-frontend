import { CreateVisitSchemaType } from "../schemas/Visit/createVisitSchema";

type Visit = CreateVisitSchemaType & {}

type VisitGroup = {
  date: string,
  visits: Array<Visit> 
}

export type {
  Visit,
  VisitGroup
}