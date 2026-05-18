import { ConflictException as NestConflictException } from '@nestjs/common';

export class ResourceConflictException extends NestConflictException {
  constructor(message = 'Resource conflict occurred') {
    super({
      statusCode: 409,
      message,
    });
  }
}
