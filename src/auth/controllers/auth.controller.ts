import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const jwt = this.authService.generateJWT(req.user as User);

    return jwt;
  }
}
