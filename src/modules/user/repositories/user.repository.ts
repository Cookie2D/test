import { Prisma, user } from '@prisma/client';
import { PrismaService } from './../../../core/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role } from 'src/const/roles';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<user> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async getOne(id: number): Promise<user> {
    return await this.prismaService.user.findUnique({
      where: { id },
      include: { role: true },
    });
  }

  async createOne(user: Prisma.userCreateInput): Promise<user> {
    const data = {
      ...user,
      role: {
        connect: {
          name: Role.USER,
        },
      },
    };

    return await this.prismaService.user.create({ data });
  }

  async patchOne(id: number, user: Prisma.userUpdateInput): Promise<user> {
    return await this.prismaService.user.update({
      where: { id },
      data: user,
      include: { role: true },
    });
  }
}
