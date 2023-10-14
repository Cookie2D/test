import { Prisma, users } from '@prisma/client';
import { UserRepository } from './../repositories/user.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { excludeFromObject } from 'src/utils/exclude';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findOne(email: string): Promise<users> {
    return this.userRepository.findOne(email);
  }

  async createOne(data: Prisma.usersCreateInput): Promise<users> {
    const exist = await this.findOne(data.email);

    if (exist) {
      throw new BadRequestException('User is already exist');
    }

    const user = await this.userRepository.createOne(data);

    return excludeFromObject(user, 'password');
  }
}
