// Nest

import { ExcelHeaderInterface } from 'src/files/application/interfaces/excel_header.interface';

// Domain

// Shared

export interface FilesServiceInterface {
  generatePDF<T>({
    data,
    templateString,
    templateUrl,
  }: {
    data: T;
    templateString?: string;
    templateUrl?: string;
  }): Promise<Buffer>;

  generateExcel<T>(data: T[], columns: ExcelHeaderInterface[]): Promise<Buffer>;
}
