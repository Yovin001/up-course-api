import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Certificate, CertificateSchema } from './schema/certificate.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Certificate.name, schema: CertificateSchema }])],
})
export class CertificateModule {}

