import React from "react";
import { Visit, VisitGroup } from "../../@types/Visit";

type VisitsContextData = {
  visits: Array<Visit>;
  groupedVisits: Array<VisitGroup>;
  handleCreateVisit: (formData: Visit) => void;
  handleUpdateVisit: (id: number, formData: Visit) => void;
  handleUpdateVisitStatus: (id: number, status: string) => void;
  handleUpdateGroupStatus: (groupDate: string, status: string) => void;
  handleCalculateDuration: (visit: VisitGroup) => number;
  handleValidateDuration: (formData: Visit, visits: Array<Visit>) => void;
  loading: boolean;
};

type VisitsProviderProps = {
  children: React.ReactNode;
}

export type {
  VisitsContextData,
  VisitsProviderProps
}