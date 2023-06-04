// Nestjs
import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as ExcelJS from 'exceljs';

// Infraestructure

// Application

// Domain
import { FilesRepositoryInterface } from 'src/files/domain/interfaces/files.repository.interface';
import { ExcelHeaderInterface } from 'src/files/application/interfaces/excel_header.interface';

// Shared

@Injectable()
export class FilesRepositoryImpl implements FilesRepositoryInterface {
  async generatePDF(html: string): Promise<Buffer> {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(html);
    const buffer = await page.pdf({ format: 'A4' });
    await browser.close();

    return buffer;
  }

  async generateExcel<T>(
    data: T[],
    columns: ExcelHeaderInterface[],
  ): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();
    worksheet.columns = columns;
    worksheet.addRows(data);
    const buffer: Buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
    return buffer;
  }

  // generate csv
}
