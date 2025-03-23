import React from 'react';
import dayjs from 'dayjs';
import { VisitsContextData, VisitsProviderProps } from './type';
import { Visit, VisitGroup } from '../../@types/Visit';

const VisitsContext = React.createContext<VisitsContextData>({} as VisitsContextData);

export function VisitsProvider({ children }: VisitsProviderProps) {
  const [visits, setVisits] = React.useState<Array<Visit>>([]);
  const [groupedVisits, setGroupedVisits] = React.useState<Array<VisitGroup>>([]);
  const [loading, setLoading] = React.useState(true);

  const handleCalculateDuration = (group: VisitGroup): number => {
    const totalDuration = group.visits.reduce((acc, visit) => acc + Number(visit.duration), 0);
    return totalDuration;
  };

  const handleValidateDuration = (newVisit: Visit, existingVisits: Array<Visit>, existingVisitId?: number) => {
    const totalDuration = existingVisits.reduce((acc, visit) => {
      if (existingVisitId && visit.id === existingVisitId) {
        return acc;
      }
      return acc + Number(visit.duration);
    }, 0) + Number(newVisit.duration);

    if (totalDuration > 480) {
      throw new Error('A duração total das visitas não pode exceder 480 minutos (8 horas).');
    }

    if (Number(newVisit.duration) < 5) {
      throw new Error('A duração da visita deve conter no mínimo 5 minutos.');
    }
  };

  const handleGroupVisitsByDate = (visitsList: Array<Visit>) => {
    const grouped = Object.values(
      visitsList.reduce((acc, visit) => {
        const key = dayjs(visit.date).format('ddd. DD/MM/YYYY');
        if (!acc[key]) {
          acc[key] = { date: key, visits: [] };
        }
        acc[key].visits.push(visit);
        return acc;
      }, {} as { [key: string]: VisitGroup })
    );

    return grouped.sort((a, b) => {
      const dateA = dayjs(a.date.split(' ')[1], 'DD/MM/YYYY');
      const dateB = dayjs(b.date.split(' ')[1], 'DD/MM/YYYY');
      return dateA.valueOf() - dateB.valueOf();
    });
  };

  const handleCreateVisit = (formData: Visit) => {
    try {
      const updatedVisits = [...visits, formData];

      const group = handleGroupVisitsByDate(updatedVisits).find(g => g.date === dayjs(formData.date).format('ddd. DD/MM/YYYY'));

      if (group) {
        handleValidateDuration(formData, group.visits);
      }

      setVisits(updatedVisits);
      setGroupedVisits(handleGroupVisitsByDate(updatedVisits));
      
      localStorage.setItem('visits', JSON.stringify(updatedVisits));
      
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateVisit = (id: number, formData: Visit) => {
    try {
      const updatedVisits = visits.map(visit => 
        visit.id === id ? { ...visit, ...formData } : visit
      );

      const group = handleGroupVisitsByDate(updatedVisits).find(g => g.date === dayjs(formData.date).format('ddd. DD/MM/YYYY'));
      if (group) {
        handleValidateDuration(formData, group.visits, id);
      }

      setVisits(updatedVisits);
      setGroupedVisits(handleGroupVisitsByDate(updatedVisits));
      
      localStorage.setItem('visits', JSON.stringify(updatedVisits));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateVisitStatus = async (id: number, completed: string) => {
    try {
      const updatedVisits = visits.map(visit => 
        visit.id === id ? { ...visit, completed } : visit
      );

      setVisits(updatedVisits);
      setGroupedVisits(handleGroupVisitsByDate(updatedVisits));
      
      localStorage.setItem('visits', JSON.stringify(updatedVisits));
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateGroupStatus = async (groupDate: string, completed: string) => {
    try {
      const group = groupedVisits.find(g => g.date === groupDate);
      
      if (!group) {
        throw new Error(`Grupo com data ${groupDate} não encontrado`);
      }
      
      const groupVisitIds = group.visits.map(visit => visit.id);
      const updatedVisits = visits.map(visit => 
        groupVisitIds.includes(visit.id) ? { ...visit, completed } : visit
      );
      
      setVisits(updatedVisits);
      setGroupedVisits(handleGroupVisitsByDate(updatedVisits));
      
      localStorage.setItem('visits', JSON.stringify(updatedVisits));
      window.dispatchEvent(new Event('storage'));
      return true;
    } catch (error) {
      console.error("Erro ao atualizar status do grupo de visitas:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    const loadVisits = () => {
      setLoading(true);
      try {
        const storedVisits = localStorage.getItem('visits');
        const visitsList: Array<Visit> = storedVisits ? JSON.parse(storedVisits) : [];

        setVisits(visitsList);
        setGroupedVisits(handleGroupVisitsByDate(visitsList));
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    loadVisits();
    
    window.addEventListener('storage', loadVisits);
    return () => window.removeEventListener('storage', loadVisits);
  }, []);

  return (
    <VisitsContext.Provider
      value={{
        visits,
        groupedVisits,
        handleCreateVisit,
        handleUpdateVisit,
        handleUpdateVisitStatus,
        handleUpdateGroupStatus,
        handleCalculateDuration,
        handleValidateDuration,
        loading
      }}
    >
      {children}
    </VisitsContext.Provider>
  );
}

export function useVisits() {
  const context = React.useContext(VisitsContext);

  if (!context) {
    throw new Error('useVisits deve ser usado dentro de um VisitsProvider');
  }

  return context;
}