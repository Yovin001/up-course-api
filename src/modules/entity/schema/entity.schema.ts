import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ _id: false })
class Progression {
  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true, enum: ['in_progress', 'completed', 'paused'] })
  status: string;

  @Prop({ type: Date })
  lastAccess: Date;
}

@Schema({ _id: false })
class EnrolledCourse {
  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course: Types.ObjectId;

  @Prop({ type: Progression })
  progression: Progression;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

@Schema({ timestamps: true })
export class Entity extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
  role: Types.ObjectId;

  @Prop({ type: [EnrolledCourse], default: [] })
  enrolledCourses: EnrolledCourse[];

  @Prop({ type: [Types.ObjectId], ref: 'Certificate', default: [] })
  certificates: Types.ObjectId[];
}

export const EntitySchema = SchemaFactory.createForClass(Entity);


EntitySchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});