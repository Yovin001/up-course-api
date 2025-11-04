import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Certificate extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Entity', required: true })
  entity: Types.ObjectId; // Estudiante que lo recibe

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId; // Curso del certificado

  @Prop({ required: true })
  pdfUrl: string;

  @Prop({ type: Date, required: true })
  issuedAt: Date;

  @Prop({ type: Date })
  validUntil: Date;
}

export const CertificateSchema = SchemaFactory.createForClass(Certificate);
