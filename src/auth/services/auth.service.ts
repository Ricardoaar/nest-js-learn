import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/token.models';
import * as bcrypt from 'bcrypt';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private JWTService: JwtService) {
  }

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneByName(name);

    const matches = await await bcrypt.compare(password, user?.password ?? '');
    if (user && matches) {


      const { password, ...userResponse } = user.toJSON();


      return userResponse;
    }

    return false;
  }

  generateJWT(user: User) {
    const payload: JwtPayload = {
      role: 'admin',
      sub: user.id,
    };

    return {
      access_token: this.JWTService.sign(payload),
      user,
    };
  }
}
