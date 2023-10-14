import { Prisma, users } from '@prisma/client';
import { PrismaService } from './../../../core/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<users> {
    return await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
  }

  async createOne(data: Prisma.usersCreateInput): Promise<users> {
    return await this.prismaService.users.create({
      data,
    });
  }
}
