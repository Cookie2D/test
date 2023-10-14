import { Prisma, user } from '@prisma/client';
import { PrismaService } from './../../../core/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<user> {
    return await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  async getOne(id: number): Promise<user> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async createOne(data: Prisma.userCreateInput): Promise<user> {
    return await this.prismaService.user.create({
      data,
    });
  }
}
