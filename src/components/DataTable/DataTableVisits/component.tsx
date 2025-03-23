import { Visit } from "../../../@types/Visit";
import { Container } from "../../../Layout/Header/style";
import { Box } from "../../../style/default";
import ButtonAction from "../../Button/Action/component";
import Title from "../../Title/component";
import { DataTableComponent } from "../component";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useVisits } from "../../../contexts/VisitContext";
import { useModal } from "../../../contexts/ModalContext";
import Header from "./Header/component";
import Footer from "./Footer/component";
import React from "react";

dayjs.extend(customParseFormat);
dayjs.locale('pt-br');

export default function DataTableVisits() {
  const { 
    groupedVisits,
    loading,
    handleUpdateVisitStatus,
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
      name: 'Status',
      cell: (row: Visit) => (
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
      ),
      sortable: true,
      wrap: false,
      grow: 0.7
    },
    {
      name: 'Ações',
      cell: (row: Visit) => (
        <ButtonAction
          style={{ padding: 10, fontSize: 14 }}
          onClick={() => openModal({name: "modal-update-visit", props: {visit: row}})}
        >
          Editar
        </ButtonAction>
      ),
      sortable: true,
      wrap: false,
      grow: 1
    },
  ];

  if (loading) {
    return <Container><Title>Carregando visitas...</Title></Container>;
  }

  return (
    <React.Fragment>
      {!!groupedVisits.length && <Container>
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
      </Container>}
    </React.Fragment>
  );
}