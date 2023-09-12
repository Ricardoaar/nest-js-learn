import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';
import { Exclude } from 'class-transformer';

@Schema()
export class User {
  constructor() {
  }


  @Prop({ required: true, type: String, index: true })
  name: string;
  @Prop({ required: true, type: String, index: true })
  email: string;
  @Prop({ required: true, type: String })
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);