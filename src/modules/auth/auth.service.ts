import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityService } from '../entity/entity.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private entityService: EntityService,
    private jwtService: JwtService
  ) {}

  async login(CreateAuthDto: CreateAuthDto) {
    const user = await this.entityService.findByEmail(CreateAuthDto.email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(CreateAuthDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}