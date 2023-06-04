// Nest
import { Inject, Injectable } from '@nestjs/common';

// Application

// Domain
import { FilesRepositoryInterface } from 'src/files/domain/interfaces/files.repository.interface';
import { FilesServiceInterface } from 'src/files/domain/interfaces/files.service.interface';

// Shared
import { HtmlFormaterHelper } from 'src/shared/application/helpers/html.formater';
import { ExcelHeaderInterface } from '../interfaces/excel_header.interface';

@Injectable()
export class FilesServiceImp implements FilesServiceInterface {
  constructor(
    @Inject('FilesRepository')
    private readonly pdfRepository: FilesRepositoryInterface,
  ) {}

  async generatePDF<T>({
    data,
    templateString,
    templateUrl,
  }: {
    data: T;
    templateString?: string;
    templateUrl?: string;
  }): Promise<Buffer> {
    const htmlHelper = new HtmlFormaterHelper();
    const html = await htmlHelper.formatHtml({
      data,
      templateString,
      templateUrl,
    });
    return this.pdfRepository.generatePDF(html);
  }

  async generateExcel<T>(
    data: T[],
    columns: ExcelHeaderInterface[],
  ): Promise<Buffer> {
    return await this.pdfRepository.generateExcel(data, columns);
  }
}
