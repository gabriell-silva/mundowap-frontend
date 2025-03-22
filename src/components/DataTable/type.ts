import { TableColumn } from 'react-data-table-component';

export type TypeDataTable<T> = {
  columns: Array<TableColumn<T>>;
  data: Array<T>;
  footerComponent?: React.ComponentType<any>;
  headerComponent?: React.ReactNode;
  paginationPerPage?: number;
};
