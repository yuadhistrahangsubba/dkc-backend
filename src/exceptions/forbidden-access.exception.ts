import { ForbiddenException as NestForbiddenException } from '@nestjs/common';

export class ForbiddenAccessException extends NestForbiddenException {
  constructor(
    message = 'Access forbidden: You do not have permission to access this resource.',
  ) {
    super({
      statusCode: 403,
      message,
    });
  }
}
