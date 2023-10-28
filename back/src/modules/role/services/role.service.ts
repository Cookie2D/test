import { role } from '@prisma/client';
import { RoleRepository } from './../repository/role.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getRole(id: number): Promise<role> {
    return await this.roleRepository.getRole(id);
  }
}
