import { ExcelHeaderInterface } from 'src/files/application/interfaces/excel_header.interface';

export const userExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: 'Nombres',
    key: 'firstName',
  },
  {
    header: 'Apellidos',
    key: 'lastName',
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
    header: 'Creado en',
    key: 'createdAt',
  },
  {
    header: 'Actualizado en',
    key: 'updatedAt',
  },
];
