import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Course extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Entity', required: true })
  author: Types.ObjectId;

  @Prop()
  duration: string;

  @Prop()
  level: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
