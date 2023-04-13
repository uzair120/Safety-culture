import { Request, Response } from 'express';
import { CONSTANTS } from '../../app.constants';
import { ApiLog } from '../dtos';

export class LogUtil {
  public static getRequestData(request: Request): ApiLog {
    const apiLog = this.getApiLogFromRequest(request);
    apiLog.body = JSON.stringify(request.body);
    apiLog.headers = JSON.stringify(request.headers);
    return apiLog;
  }

  public static getResponseData(request: Request, response: Response): ApiLog {
    const apiLog = this.getApiLogFromRequest(request);
    apiLog.statusCode = response.statusCode;
    return apiLog;
  }

  public static getApiLogFromRequest(request: Request): ApiLog {
    const apiLog = new ApiLog();
    apiLog.method = request.method;
    apiLog.url = request.url;
    apiLog.ip = request.ip;
    apiLog.requestId = request.header(CONSTANTS.HEADERS.X_REQUEST_ID);
    apiLog.host = request.hostname;
    return apiLog;
  }

  public static getRequestLog(requestData: ApiLog): string {
    let log =
      '\n=========================== REQUEST BEGIN ================================================';
    log += '\nMethod=[' + requestData.method + ' - ' + requestData.url + ']';
    log += '\nHeaders=[' + requestData.headers + ']';
    log += '\nRequestPayload=[' + requestData.body + ']';
    log +=
      '\n============================= REQUEST END =================================================';
    return log;
  }

  public static getResponseLog(responseData: ApiLog): string {
    let log =
      '\n=========================== RESPONSE BEGIN ================================================';
    log += '\nStatusCode=[' + responseData.statusCode + ']';
    log += '\nMethod=[' + responseData.method + ' - ' + responseData.url + ']';

    if (responseData.responseTime) {
      log += '\nResponseTime=[' + responseData.responseTime + ' Milliseconds]';
    }

    log += '\nResponseBody=[' + responseData.body + ']';
    log +=
      '\n============================= RESPONSE END =================================================';
    return log;
  }
}
