import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('SQL');

  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }

    this.logger.log(
      `{"query": "${query}", "parameters": "${this.stringifyParameters(
        parameters,
      )}"}`,
    );
  }
  logQueryError(
    error: string,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.error(
      `{"query": "${query}", "parameters": "${this.stringifyParameters(
        parameters,
      )}", "error": "${error}"}`,
    );
  }
  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[],
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    this.logger.warn(
      `{"time": "${time}", "parameters": "${this.stringifyParameters(
        parameters,
      )}", "query": "${query}"}`,
    );
  }
  logMigration(message: string) {
    this.logger.log(`"message": "${message}"`);
  }
  logSchemaBuild(message: string) {
    this.logger.log(`"message": "${message}"`);
  }
  log(
    level: 'log' | 'info' | 'warn',
    message: string,
    queryRunner?: QueryRunner,
  ) {
    if (queryRunner?.data?.isCreatingLogs) {
      return;
    }
    if (level === 'log') {
      return this.logger.log(`"message": "${message}"`);
    }
    if (level === 'info') {
      return this.logger.debug(`"message": "${message}"`);
    }
    if (level === 'warn') {
      return this.logger.warn(`"message": "${message}"`);
    }
  }
  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters).replace(/"/g, '\\"');
    } catch {
      return '';
    }
  }
}

export default DatabaseLogger;
