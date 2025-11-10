import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsMongoId,
  ValidateNested,
  IsNumber,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Subdocumento: progreso dentro de un curso
 */
class ProgressionDto {
  @ApiProperty({ example: 75, description: 'Porcentaje de progreso en el curso' })
  @IsNumber()
  percentage: number;

  @ApiProperty({
    example: 'in_progress',
    enum: ['in_progress', 'completed', 'paused'],
    description: 'Estado actual del progreso',
  })
  @IsString()
  @IsIn(['in_progress', 'completed', 'paused'])
  status: string;

  @ApiPropertyOptional({
    example: '2025-11-01T00:00:00Z',
    description: 'Fecha del último acceso al curso',
  })
  @IsOptional()
  @Type(() => Date)
  lastAccess?: Date;
}

/**
 * Subdocumento: curso inscrito
 */
class EnrolledCourseDto {
  @ApiProperty({
    example: '671fa4f0a4215e50f1a4b0d2',
    description: 'ID del curso al que el usuario está inscrito',
  })
  @IsMongoId()
  course: string;

  @ApiProperty({
    description: 'Progreso dentro del curso',
    type: () => ProgressionDto,
  })
  @ValidateNested()
  @Type(() => ProgressionDto)
  progression: ProgressionDto;

  @ApiPropertyOptional({
    example: '2025-11-01T00:00:00Z',
    description: 'Fecha de inicio del curso',
  })
  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @ApiPropertyOptional({
    example: '2025-11-10T00:00:00Z',
    description: 'Fecha de finalización del curso',
  })
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

/**
 * DTO para actualizar una entidad (usuario)
 */
export class UpdateEntityDto {
  @ApiPropertyOptional({ example: 'Yovin Urrego', description: 'Nombre del usuario' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'yovin@example.com', description: 'Correo electrónico del usuario' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'securePassword123', description: 'Contraseña del usuario' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    example: '671fa4f0a4215e50f1a4b0e9',
    description: 'ID del rol asignado al usuario',
  })
  @IsOptional()
  @IsMongoId()
  role?: string;

  @ApiPropertyOptional({
    description: 'Lista de cursos inscritos con su progreso',
    type: [EnrolledCourseDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnrolledCourseDto)
  enrolledCourses?: EnrolledCourseDto[];

  @ApiPropertyOptional({
    example: ['671fa4f0a4215e50f1a4b0f3'],
    description: 'Lista de IDs de certificados obtenidos',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  certificates?: string[];
}
