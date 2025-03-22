import DataTable from 'react-data-table-component';
import { TypeDataTable } from './type';
import { Box } from '../../style/default';

export const DataTableComponent = <T,>({
    columns,
    data,
    footerComponent,
    headerComponent,
    paginationPerPage = 100,
    ...rest
  }: TypeDataTable<T>) => {
    const pagination = !!footerComponent;
    const header = !!headerComponent;
  
    const customStyles = {
      rows: {
        style: {
          minHeight: "0px",
          padding: "0",
          fontSize: "1rem",
          fontFamily: "roboto",
          color: "#1A202C"
        }
      },
      headRow: {
        style: {
          height: "0",
          padding: "0rem",
          backgroundColor: "#4b6eff",
          textTransform: "uppercase",
          borderRadius: headerComponent ? "0" : "0.5rem 0.5rem 0rem 0rem"
        }
      },
      headCells: {
        style: {
          fontSize: ".9rem",
          fontWeight: "600",
          fontFamily: "roboto",
          padding: "0 8px",
          color: "#FFFFFF"
        }
      },
      cells: {
        style: {
          padding: "10px 8px",
          backgroundColor: "#10101010"
        }
      },
      table: {
        style: {
          width: "100%",
          minWidth: {base: "300px", md: "800px"},
          borderRadius: "0.5rem 0.5rem 0rem 0rem"
        }
      },
      subHeader: {
        style: {
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          fontFamily: "roboto",
          borderRadius: "0.5rem 0.5rem 0rem 0rem",
          backgroundColor: "#00000029"
        }
      },
      pagination: {
        style: {
          borderRadius: "0px 0px 8px 8px"
        }
      },
      noData: {
        style: {
          textAlign: "center",
          fontSize: "1rem",
          fontFamily: "roboto",
          padding: "2rem"
        }
      }
    };
  
    return (
      <Box>
        <DataTable
          dense
          columns={columns}
          data={data}
          pagination={pagination}
          paginationComponent={footerComponent}
          customStyles={customStyles}
          subHeader={header}
          noDataComponent={"Não há registros para exibir"}
          paginationPerPage={paginationPerPage}
          {...rest}
        />
      </Box>
    );
  };
  
 