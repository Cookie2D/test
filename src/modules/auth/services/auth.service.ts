import { UserService } from './../../user/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as messages from '../../../const/messages';
import { LoginDto } from '../dto/login.dto';
import { RoleService } from 'src/modules/role/services/role.service';
import { IRequest } from '../../../types/request.type';
import { AuthResponseDto } from '../dto/response.dto';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto, res: Response): Promise<AuthResponseDto> {
    const user = await this.userService.findOne(body.email);

    if (!user) {
      throw new UnauthorizedException(messages.INCORRECT_USER_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(messages.INCORRECT_USER_CREDENTIALS);
    }

    const tokens = await this.generateToken(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    res.cookie(process.env.REFRESH_TOKEN, tokens.refreshToken);
    return { token: tokens.accessToken };
  }

  async logout(userId: number) {
    return this.userService.updateOneById(userId, { refresh_token: null });
  }

  async register(body: CreateUserDto, res: Response): Promise<AuthResponseDto> {
    const password = await bcrypt.hash(body.password, process.env.BCRYPT_SALT);

    const newUser = await this.userService.createOne({
      ...body,
      password,
    });

    const tokens = await this.generateToken(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    res.cookie(process.env.REFRESH_TOKEN, tokens.refreshToken);
    return { token: tokens.accessToken };
  }

  private async generateToken(
    user: user,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokens = await this.getTokens(user.id, user.roleId);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, process.env.BCRYPT_SALT);
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.updateOneById(userId, {
      refresh_token: hashedRefreshToken,
    });
    return hashedRefreshToken;
  }

  async getTokens(userId: number, roleId: number) {
    const role = await this.roleService.getRole(roleId);
    const payload: IRequest['user'] = { sub: userId, role: role.name };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
