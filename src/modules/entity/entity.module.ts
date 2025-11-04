import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Entity, EntitySchema } from './schema/entity.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }])],

})
export class EntityModule {}