import {
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
  ExceptionFilter,
} from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError, TypeORMError } from "typeorm";

interface ErrorResponse {
  status: number;
  message: string;
  code: string;
  stack?: string;
}
interface HttpExceptionResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

interface PostgresError extends Error {
  code: string;
  detail?: string;
  table?: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let errorResponse: ErrorResponse;
    switch (true) {
      case exception instanceof TypeORMError:
        errorResponse = this.handleTypeOrmError(exception);
        break;
      case exception instanceof HttpException:
        errorResponse = this.handleHttpError(exception);

        break;

      default:
        errorResponse = this.handleGenericError(exception);
    }
    this.logger.error(
      `[${errorResponse.code}] ${request.method} ${request.url}`,
      errorResponse.message + `[Stack: ${errorResponse.stack}]`,
    );
    let errorStack: Record<string, unknown> = {};
    if (errorResponse.stack) {
      errorStack = { stack: errorResponse.stack };
    }
    response.status(errorResponse.status).json({
      statusCode: errorResponse.status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: errorResponse.message,
      code: errorResponse.code,
      ...(errorStack ?? {}),
    });
  }

  private handleTypeOrmError(exception: TypeORMError): ErrorResponse {
    let code = "DB_ERROR";
    let status = HttpStatus.BAD_REQUEST;
    let message = "Database Error";
    const stack = exception.stack;

    if (exception instanceof QueryFailedError) {
      const driverError = exception.driverError as PostgresError;

      if (driverError.code === "23505") {
        status = HttpStatus.CONFLICT;
        message = "This record already exists.";
        code = "DB_CONFLICT";
      } else if (driverError.code === "23503") {
        status = HttpStatus.BAD_REQUEST;
        message = "Operation failed due to missing dependencies (Foreign Key).";
        code = "DB_CONSTRAINT";
      }
    }

    return { status, message, code, stack };
  }

  private handleHttpError(exception: HttpException): ErrorResponse {
    const response = exception.getResponse();

    let message = exception.message;

    if (typeof response === "object" && response !== null) {
      const responseObj = response as HttpExceptionResponse;

      if (Array.isArray(responseObj.message)) {
        message = responseObj.message.join(", ");
      } else if (typeof responseObj.message === "string") {
        message = responseObj.message;
      }
    }

    return {
      status: exception.getStatus(),
      message: message,
      code: "HTTP_ERROR",
    };
  }

  private handleGenericError(exception: unknown): ErrorResponse {
    const message =
      exception instanceof Error ? exception.message : "Unknown Error";
    const errorException = exception instanceof Error ? exception : null;
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: message,
      code: "INTERNAL_ERROR",
      stack: errorException?.stack,
    };
  }
}
