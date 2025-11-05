import { IsString, IsEmail, IsOptional, IsArray, IsMongoId, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class ProgressionDto {
  @IsNumber()
  percentage: number;

  @IsString()
  status: string;

  @IsOptional()
  @Type(() => Date)
  lastAccess?: Date;
}

class EnrolledCourseDto {
  @IsMongoId()
  course: string;

  @ValidateNested()
  @Type(() => ProgressionDto)
  progression: ProgressionDto;

  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}

export class UpdateEntityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsMongoId()
  role?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EnrolledCourseDto)
  enrolledCourses?: EnrolledCourseDto[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  certificates?: string[];
}
