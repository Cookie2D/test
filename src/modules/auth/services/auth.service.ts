import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  login(body: any) {
    return this.authRepository.login(body);
  }

  async register(body: CreateUserDto) {
    const password = await bcrypt.hash(body.password, process.env.BCRYPT_SALT);

    return this.authRepository.createOneUser({
      ...body,
      password,
    }); // generate JWT token and return for other requests
  }
}
