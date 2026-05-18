import { type IQuery, type IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResourceNotFoundException } from '../../../exceptions/resource-not-found.exception';
import { AuditLogEntity } from '../entities/audit-log.entity';

export class GetAuditLogByIdQuery implements IQuery {
  constructor(public readonly id: Uuid) {}
}

@QueryHandler(GetAuditLogByIdQuery)
export class GetAuditLogByIdHandler
  implements IQueryHandler<GetAuditLogByIdQuery, AuditLogEntity>
{
  constructor(
    @InjectRepository(AuditLogEntity)
    private logRepository: Repository<AuditLogEntity>,
  ) {}

  async execute(query: GetAuditLogByIdQuery): Promise<AuditLogEntity> {
    const { id } = query;

    const entity = await this.logRepository
      .createQueryBuilder('auditLog')
      .where('auditLog.id = :id', { id })
      .getOne();

    if (!entity) {
      throw new ResourceNotFoundException(`Audit Log not found.`);
    }

    return entity;
  }
}
