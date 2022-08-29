import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

export class RedirectError extends Error {
  constructor(public readonly status: number, public readonly url: string) {
    super();
  }
}

@Catch(RedirectError)
export class RedirectFilter implements ExceptionFilter {
  public catch(exception: RedirectError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.redirect(exception.status, exception.url);
  }
}