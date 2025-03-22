import React from "react";
import { Visit } from "../../../@types/Visit";
import { Container } from "../../../Layout/Header/style";
import { Box, FlexColumn, FlexRow } from "../../../style/default";
import ButtonAction from "../../Button/Action/component";
import Progressbar from "../../ProgressBar/component";
import Title from "../../Title/component";
import { DataTableComponent } from "../component";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useVisits } from "../../../contexts/VisitContext";
import { useModal } from "../../../contexts/ModalContext";

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

type VisitGroup = {
  date: string,
  visits: Array<Visit> 
}

export default function DataTableVisits() {
  const { 
    groupedVisits,
    loading,
    handleCalculateDuration,
    handleUpdateVisitStatus,
    handleUpdateGroupStatus
  } = useVisits();
  const { openModal } = useModal();

  const columns = [
    {
      name: 'Formulários',
      selector: (row: Visit) => row.amount_form || 0,
      sortable: true,
      wrap: true,
      grow: 0.5
    },
    {
      name: 'Produtos',
      selector: (row: Visit) => row.amount_products || 0,
      sortable: true,
      wrap: true,
      grow: 0.5
    },
    {
      name: 'Duração',
      selector: (row: Visit) => `${row.duration} min` || 0,
      sortable: true,
      wrap: true,
      grow: 0.5
    },
    {
      name: 'Logradouro, Número - CEP',
      selector: (row: Visit) => row.address && `${row.address.street}, ${row.address.street_number} - ${row.address.zip_code}`,
      sortable: true,
      wrap: true,
      width: "320px"
    },
    {
      name: 'Bairro, Cidade - UF',
      selector: (row: Visit) => row.address && `${row.address.neighborhood}, ${row.address.city} - ${row.address.uf}`,
      sortable: true,
      wrap: true,
      width: "300px"
    },
    {
      name: 'Ações',
      cell: (row: Visit) => (
        <div>
            <ButtonAction
              style={{ padding: 10, fontSize: 14, backgroundColor: row.completed === "1" ? '#4CAF50' : '#999' }}
              disabled={row.completed === "1"}
              onClick={() => {
                if(!row.id) return;
                
                const newStatus = row.completed === "1" ? "0" : "1";
                handleUpdateVisitStatus(row.id, newStatus);
              }}
            >
              {row.completed === "1" ? 'Concluído' : 'Pendente'}
            </ButtonAction>
          <ButtonAction
            style={{ padding: 10, fontSize: 14 }}
            onClick={() => openModal({name: "modal-update-visit", props: {visit: row}})}
          >
            Editar
          </ButtonAction>
        </div>
      ),
      sortable: true,
      wrap: false,
      grow: 1
    },
  ];

  const Header = ({ group, style }: { group: VisitGroup; style: React.CSSProperties }) => {
    const totalDuration = handleCalculateDuration(group);
    const completionPercentage = Math.min((totalDuration / 480) * 100, 100);

    return (
      <FlexRow style={{ justifyContent: 'space-between', alignItems: 'center', ...style }}>
        <Title>
          {group.date}
        </Title>

        <FlexColumn>
          <span style={{ fontSize: 12, color: '#666' }}>
            {`Duração: ${totalDuration}min / 480min (${Math.min((totalDuration / 480) * 100, 100).toFixed(2)}%)`}
          </span>

          <Progressbar value={completionPercentage} />
        </FlexColumn>
      </FlexRow>
    );
  };

  if (loading) {
    return <Container><Title>Carregando visitas...</Title></Container>;
  }

  const Footer = ({group}: {group: VisitGroup}) => {
    const rowCount = group.visits.length

    return (
      <FlexRow 
        style={{
          backgroundColor: '#10101010',
          borderRadius: '0px 0px 8px 8px',
          borderTop: '1px solid #10101020',
          justifyContent: 'space-between',
          alignItems:'center',
          padding: '10px 8px',
        }}
      >
        <span>Total de visitas: {rowCount}</span>
        <ButtonAction
          style={{ padding: 12, fontSize: 14 }}
          disabled={group.visits.every(visit => visit.completed === "1") && handleCalculateDuration(group) == 480}
          onClick={() => handleUpdateGroupStatus(group.date, "1")}
        >
          Fechar visitas do dia
        </ButtonAction>
      </FlexRow>
    );
  }

  return (
    <Container>
      <Title>Visitas</Title>

      {groupedVisits?.map(group => (
        <Box key={group.date} style={{ margin: "25px 0px" }}>
          <Header group={group} style={{textTransform: "capitalize"}} />
          <DataTableComponent<Visit>
            columns={columns}
            data={group.visits}
            footerComponent={() => Footer({group})}
          />
        </Box>
      ))}
    </Container>
  );
}