import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
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

}
