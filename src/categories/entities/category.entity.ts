import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ObjectId } from 'mongodb';

@Schema()
export class Category {
  @Prop({ required: true, type: String, index: true })
  name: string;
  @Prop({ required: true, type: String, index: true })
  description: string;
  @Prop({ required: false, type: String, index: true })
  image: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Product' }],

  })
  products: Types.Array<ObjectId>;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({
  name: 1,
});