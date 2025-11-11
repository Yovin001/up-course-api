import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateAuthDto {
  @ApiProperty({ example: 'yovin@example.com', description: 'Correo electrónico' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123456', description: 'Contraseña' })
  @IsString()
  password: string;
}