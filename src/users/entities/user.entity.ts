import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

@Schema()
export class User {
  constructor() {
  }


  @Prop({ required: true, type: String, index: true })
  name: string;
  @Prop({ required: true, type: String, index: true })
  email: string;
  @Prop({ required: true, type: String })
  @ExcludeProperty()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);