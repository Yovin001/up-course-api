import { IsString, IsEmail, IsOptional, IsArray, IsMongoId, ValidateNested, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class ProgressionDto {
  @ApiProperty({ example: 50, description: 'Porcentaje de progreso' })
  @IsNumber()
  percentage: number;

  @ApiProperty({ example: 'in-progress', description: 'Estado del curso' })
  @IsString()
  status: string;

  @ApiPropertyOptional({ example: '2025-11-04T18:00:00Z', description: 'Último acceso' })
  @IsOptional()
  @Type(() => Date)
  lastAccess?: Date;
}

class EnrolledCourseDto {
  @ApiProperty({ example: '690a7bff76c0fb3f61ce5f48', description: 'ID del curso' })
  @IsMongoId()
  course: string;

  @ApiProperty({ type: ProgressionDto })
  @ValidateNested()
  @Type(() => ProgressionDto)
  progression: ProgressionDto;

  @ApiPropertyOptional({ example: '2025-11-01T00:00:00Z', description: 'Fecha de inicio' })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-11-30T00:00:00Z', description: 'Fecha de finalización' })
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

export class CreateEntityDto {
  @ApiProperty({ example: 'Yovin Urrego', description: 'Nombre completo del usuario' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'yovin@example.com', description: 'Correo electrónico' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Contraseña' })
  @IsString()
  password: string;

  @ApiProperty({ example: '690a7bff76c0fb3f61ce5f48', description: 'ID del rol' })
  @IsMongoId()
  role: string;

  @ApiPropertyOptional({ type: [EnrolledCourseDto], description: 'Cursos en los que está inscrito' })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnrolledCourseDto)
  enrolledCourses?: EnrolledCourseDto[];

  @ApiPropertyOptional({ example: ['690a7bff76c0fb3f61ce5f48'], description: 'Certificados obtenidos' })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  certificates?: string[];
}
