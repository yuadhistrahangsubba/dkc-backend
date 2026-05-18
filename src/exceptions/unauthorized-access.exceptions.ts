import { UnauthorizedException as NestUnauthorizedException } from '@nestjs/common';

export class UnauthorizedAccessException extends NestUnauthorizedException {
  constructor(
    message = 'Access denied: You are not authorized to perform this action.',
  ) {
    super({
      statusCode: 401,
      message,
    });
  }
}
