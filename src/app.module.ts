import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

//Modules
import { CourseModule } from './modules/course/course.module';
import { EntityModule } from './modules/entity/entity.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { RoleModule } from './modules/role/role.module';
import { PermissionModule } from './modules/permission/permission.module';

@Module({
  imports: [  ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    CourseModule, EntityModule, CertificateModule, RoleModule, PermissionModule
  ],

})
export class AppModule {}
