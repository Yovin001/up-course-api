import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { Entity } from './schema/entity.schema';

@Controller('entities')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la entidad que se desea actualizar',
    example: '67291b2a3cbe45c0c9d4a1f2', // ejemplo visible en Swagger
  })
  @ApiResponse({ status: 200, description: 'Entidad actualizada exitosamente', type: Entity })
  @ApiResponse({ status: 404, description: 'Entidad no encontrada' })

  async update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto
  ) {
    return this.entityService.update(id, updateEntityDto);
  }
  
}
