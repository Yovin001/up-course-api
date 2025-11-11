import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entity } from './schema/entity.schema';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Injectable()
export class EntityService {
  constructor(@InjectModel(Entity.name) private entityModel: Model<Entity>) {}

  async create(createEntityDto: CreateEntityDto) {
    try {
      const createdEntity = new this.entityModel(createEntityDto);
      return await createdEntity.save();
    } catch (error: any) {
      if (error.code === 11000) { // Código de MongoDB para duplicados
        throw new ConflictException(`El email "${createEntityDto.email}" ya está registrado.`);
      } else {
        throw new InternalServerErrorException('Error al crear la entidad.');
      }
    }
  }

  async update(id: string, updateEntityDto: UpdateEntityDto) {
    try {
      const updatedEntity = await this.entityModel.findByIdAndUpdate(
        id,
        updateEntityDto,
        { new: true, runValidators: true } // importante: aplica validaciones del schema
      );

      if (!updatedEntity) {
        throw new NotFoundException(`Entidad con id ${id} no encontrada`);
      }

      return updatedEntity;
    } catch (error: any) {
      if (error.code === 11000) { // duplicado
        throw new ConflictException('El email ya está registrado');
      }
      throw new InternalServerErrorException('Error al actualizar la entidad');
    }
  }

  async findByEmail(email: string): Promise<Entity | null> {
    return this.entityModel.findOne({ email }).exec();
  }


}