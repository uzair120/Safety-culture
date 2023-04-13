import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiLog, LogUtil } from '../../common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();

    const requestData: ApiLog = LogUtil.getRequestData(request);
    const ctx = `${LoggingInterceptor.name} - ${requestData.ip} - ${requestData.requestId}`;
    this._logRequest(requestData, ctx);

    return next.handle().pipe(
      tap({
        next: (body: unknown): void => {
          const response = context.switchToHttp().getResponse();

          const responseData = LogUtil.getResponseData(request, response);
          responseData.responseTime = Date.now() - now;
          responseData.body = JSON.stringify(body);

          this._logResponse(responseData, ctx);
        },
        error: (): void => {
          requestData.responseTime = Date.now() - now;
        },
      }),
    );
  }

  private _logRequest(requestData: ApiLog, context: string) {
    const log = LogUtil.getRequestLog(requestData);
    this.logger.log(log, context);
  }

  private _logResponse(responseData: ApiLog, context: string) {
    const log = LogUtil.getResponseLog(responseData);
    this.logger.log(log, context + ' - ' + responseData.statusCode);
  }
}
