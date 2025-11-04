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

//Controles and Services
import { EntityController } from './modules/entity/entity.controller';
import { EntityService } from './modules/entity/entity.service';
import { CourseController } from './modules/course/course.controller';
import { CourseService } from './modules/course/course.service';
import { CertificateController } from './modules/certificate/certificate.controller';
import { CertificateService } from './modules/certificate/certificate.service';
import { RoleController } from './modules/role/role.controller';
import { RoleService } from './modules/role/role.service';
import { PermissionController } from './modules/permission/permission.controller';
import { PermissionService } from './modules/permission/permission.service';

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
  controllers: [AppController, EntityController, CourseController, CertificateController, RoleController, PermissionController],
  providers: [AppService, EntityService, CourseService, CertificateService, RoleService, PermissionService],

})
export class AppModule {}
