import { UserService } from './../../user/services/user.service';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(body: any) {
    return this.authRepository.login(body);
  }

  async register(body: CreateUserDto) {
    const password = await bcrypt.hash(body.password, process.env.BCRYPT_SALT);

    const newUser = await this.userService.createOne({
      ...body,
      password,
    });

    const payload = { sub: newUser.id, email: newUser.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
