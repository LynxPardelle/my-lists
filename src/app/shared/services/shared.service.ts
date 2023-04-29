import { Injectable } from '@angular/core';
/* Interfaces */
/* Bef */
import { NgxBootstrapExpandedFeaturesService as BefService } from 'ngx-bootstrap-expanded-features';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public lastcssCreate: number = new Date().getTime();
  public lastTimeNeedcssCreate: number = new Date().getTime();
  public timer: any = null;
  public timescssCreated: number = 0;
  public timesNeedcssCreated: number = 0;
  constructor(private _befService: BefService) {}
  checkWindowWidth(downUp: string, width: number): boolean {
    switch (true) {
      case (window.innerWidth >= width && downUp === 'up') ||
        (window.innerWidth < width && 'down'):
        return true;
      case (window.innerWidth >= width && downUp === 'down') ||
        (window.innerWidth < width && 'up'):
        return false;
      default:
        return true;
    }
  }

  checkElementProperty(elementId: string, property: string): number {
    let element: any = document.getElementById(elementId);
    return !!element ? element[property] : 0;
  }

  cssCreate() {
    this._befService.cssCreate();
  }

  getStackTrace() {
    let stack;
    try {
      throw new Error('');
    } catch (error: any) {
      stack = error.stack || '';
    }
    stack = stack.split('\n').map((line: any) => {
      return line.trim();
    });
    return stack.splice(stack[0] == 'Error' ? 2 : 1);
  }

  consoleLog(
    thing: any,
    line: string | null = null,
    style: string = 'padding: 1em;',
    type: 'log' | 'info' | 'trace' | 'error' = 'log'
  ) {
    this.consoleParser({
      type: type,
      thing: thing,
      style: style,
      line: line,
      stoper: false,
    });
  }

  consoleParser(config: {
    type?: 'log' | 'info' | 'trace' | 'error';
    thing: any;
    style?: string;
    line?: string | null;
    stoper?: boolean;
  }): void {
    config.type = config.type ? config.type : 'log';
    config.style = config.style ? config.style : 'padding: 1em';
    config.stoper = config.stoper ? config.stoper : false;
    if (config.stoper === false) {
      if (config.line) {
        console.info('%cline: ' + config.line + ' = ', config.style);
      }
      console.info('%c' + this.getStackTrace()[1], config.style);
      console.groupCollapsed('Trace');
      console.trace();
      console.groupEnd();
      {
        switch (config.type) {
          case 'log':
            console.log(
              '%c' +
                (typeof config.thing === 'object'
                  ? JSON.stringify(config.thing)
                  : config.thing),
              config.style
            );
            break;
          case 'info':
            console.info(
              '%c' +
                (typeof config.thing === 'object'
                  ? JSON.stringify(config.thing)
                  : config.thing),
              config.style
            );
            break;
          case 'error':
            console.error(
              '%c' +
                (typeof config.thing === 'object'
                  ? JSON.stringify(config.thing)
                  : config.thing),
              config.style
            );
            break;
          default:
            break;
        }
      }
      if (typeof config.thing === 'object') {
        console.dir(config.thing);
      }
    }
  }

  random(min: number = 0, max: number = 50) {
    let num = Math.random() * (max - min) + min;
    return Math.round(num);
  }

  getFechaHoy() {
    let date = new Date();
    return date;
  }

  getHTML(type: string, size: string = '16'): string {
    switch (type) {
      case 'edit':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[1] : size
        }" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
        </svg>
        `;
        break;
      case 'acept':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[1] : size
        }" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
        </svg>
        `;
        break;
      case 'delete':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[0] : size
        }" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
        </svg>
        `;
        break;
      case 'photos':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[0] : size
        }" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
          <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
          <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
        </svg>
        `;
        break;
      case 'score':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[0] : size
        }" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
        `;
        break;
      case 'back':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[0] : size
        }" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        `;
        break;
      case 'create':
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="${
          size.includes('-') ? size.split('-')[0] : size
        }" height="${
          size.includes('-') ? size.split('-')[0] : size
        }" fill="currentColor" class="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16">
          <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z"/>
        </svg>
        `;
        break;
      default:
        return type;
        break;
    }
  }
}
