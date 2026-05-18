import { NotFoundException as NestNotFoundException } from '@nestjs/common';

export class ResourceNotFoundException extends NestNotFoundException {
  constructor(message = 'Resource not found') {
    super({
      statusCode: 404,
      message,
    });
  }
}
