import { ExcelHeaderInterface } from 'src/files/application/interfaces/excel_header.interface';

export const shopExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: 'Nombre',
    key: 'name',
  },
  {
    header: 'Nit',
    key: 'nit',
  },
  {
    header: 'Email',
    key: 'email',
  },
  {
    header: 'Teléfono',
    key: 'phone',
  },
  {
    header: 'Website',
    key: 'website',
  },
  {
    header: 'Owner',
    key: 'owner.firstName',
  },
  {
    header: 'Creado en',
    key: 'createdAt',
  },
  {
    header: 'Última edición',
    key: 'updatedAt',
  },
];
