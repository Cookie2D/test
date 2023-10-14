import { UserService } from './../../user/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as messages from '../../../const/messages';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto): Promise<{ token: string }> {
    const user = await this.userService.findOne(body.email);

    if (!user) {
      throw new UnauthorizedException(messages.INCORRECT_USER_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException(messages.INCORRECT_USER_CREDENTIALS);
    }

    return this.generateToken(user);
  }

  async register(body: CreateUserDto) {
    const password = await bcrypt.hash(body.password, process.env.BCRYPT_SALT);

    const newUser = await this.userService.createOne({
      ...body,
      password,
    });

    return this.generateToken(newUser);
  }

  private async generateToken(user: user): Promise<{ token: string }> {
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
