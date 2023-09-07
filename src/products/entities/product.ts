import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({
  price: 1,
  name: 1,
});