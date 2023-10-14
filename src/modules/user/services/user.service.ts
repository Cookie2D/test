import { Prisma, users } from '@prisma/client';
import { UserRepository } from './../repositories/user.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { excludeFromObject } from 'src/utils/exclude';
import * as messages from '../../../const/messages';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string): Promise<users> {
    return await this.userRepository.findOne(email);
  }

  async getOne(id: number): Promise<users> {
    const user = await this.userRepository.getOne(id);
    return excludeFromObject(user, 'password');
  }

  async createOne(data: Prisma.usersCreateInput): Promise<users> {
    const exist = await this.findOne(data.email);

    if (exist) {
      throw new BadRequestException(messages.USER_EXIST);
    }

    const user = await this.userRepository.createOne(data);

    return excludeFromObject(user, 'password');
  }
}
