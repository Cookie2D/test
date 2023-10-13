import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}
  login(body: any) {
    return this.prismaService.users.findMany();
  }

  createOneUser(data: Prisma.usersCreateInput) {
    return this.prismaService.users.create({
      data,
    }); // return user id only
  }
}
