import { Prisma, user } from '@prisma/client';
import { UserRepository } from './../repositories/user.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { excludeFromObject } from 'src/utils/exclude';
import * as messages from '../../../const/messages';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(email: string): Promise<user> {
    return await this.userRepository.findOne(email);
  }

  async getOne(id: number): Promise<user> {
    const user = await this.userRepository.getOne(id);
    return excludeFromObject(user, 'password');
  }

  async createOne(data: Prisma.userCreateInput): Promise<user> {
    const exist = await this.findOne(data.email);

    if (exist) {
      throw new BadRequestException(messages.USER_EXIST);
    }

    const user = await this.userRepository.createOne(data);

    return excludeFromObject(user, 'password');
  }

  async updateOneById(id: number, data: Prisma.userUpdateInput): Promise<user> {
    const updatedUser = await this.userRepository.patchOne(id, data);

    return excludeFromObject(updatedUser, 'password');
  }
}
