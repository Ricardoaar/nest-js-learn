import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';


@Schema()
export class Product {
  @Prop({ required: true, type: String, index: true })
  name?: string;

  @Prop({ required: true, type: Number, index: true })
  price?: number;

  @Prop({ required: false, type: String })
  description?: string;

  @Prop({ required: true, type: Number })
  stock?: number;


  @Prop({
    type: Types.ObjectId,
    ref: 'Category',
  })
  category: Types.ObjectId;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({
  price: 1,
  name: 1,
});