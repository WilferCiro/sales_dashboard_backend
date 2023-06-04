// Nest

import { ExcelHeaderInterface } from 'src/files/application/interfaces/excel_header.interface';

// Domain

// Shared

export interface FilesRepositoryInterface {
  generatePDF(html: string): Promise<Buffer>;
  generateExcel<T>(data: T[], columns: ExcelHeaderInterface[]): Promise<Buffer>;
}
