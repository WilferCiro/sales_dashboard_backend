import * as Mustache from 'mustache';
import { readFileSync } from 'fs';
import { join } from 'path';

export class HtmlFormaterHelper {
  async formatHtml<T>({
    data,
    templateString,
    templateUrl,
  }: {
    data: T;
    templateString?: string;
    templateUrl?: string;
  }): Promise<string> {
    let template = templateString;
    if (templateUrl) {
      template = readFileSync(
        join(process.cwd(), '/src/shared/domain/html_templates/initial.html'),
      ).toString();
    }

    const html = await Mustache.render(template, data);
    return html;
  }
}
