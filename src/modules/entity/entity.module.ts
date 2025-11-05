import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Entity, EntitySchema } from './schema/entity.schema';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }])],
    controllers: [EntityController],
    providers: [EntityService],
    exports: [EntityService],
})
export class EntityModule { }