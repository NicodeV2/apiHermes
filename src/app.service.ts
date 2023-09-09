import { Injectable } from '@nestjs/common';
import { apiConstants } from './api.constats';

@Injectable()
export class AppService {
  getHello(): string {
    const apiName = apiConstants.name;
    const apiVersion = apiConstants.version;
    const url = `/documentacion`;
    return `
    <html>
    <head>
      <title>${apiName} ${apiVersion}</title>
      <style>
        body {
          font-family: sans-serif;
          font-size: 16px;
        }
  
        h1 {
          text-align: center;
        }
  
        p {
          margin-bottom: 10px;
        }
  
        a {
          color: blue;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>Bienvenido a ${apiName}</h1>
      <p>La versión actual es ${apiVersion}</p>
      <p>Para ver la documentación haz click <a href="${url}">aquí</a>.</p>
    </body>
  </html>
    `;
  }
}
