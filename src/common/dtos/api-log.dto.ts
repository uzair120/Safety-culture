export class ApiLog {
  requestId: string;
  statusCode: number;
  responseTime: number;
  method: string;
  url: string;
  ip: string;
  body: any;
  headers: any;
  host: string;
}
