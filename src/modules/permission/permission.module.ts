import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './schema/permission.schema';

@Module({
imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])],

})
export class PermissionModule {}
