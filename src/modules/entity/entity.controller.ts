import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { EntityService } from './entity.service';
import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';

@Controller('entities')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Post()
  async create(@Body() createEntityDto: CreateEntityDto) {
    return this.entityService.create(createEntityDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEntityDto: UpdateEntityDto
  ) {
    return this.entityService.update(id, updateEntityDto);
  }
  
}
