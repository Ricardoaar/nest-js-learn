import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Inject } from '@nestjs/common';

@Schema()
export class ProductSubDoc {


  @Prop({ required: true, type: String, index: true })
  name?: string;

  @Prop({ required: true, type: Number, index: true })
  price?: number;
}

export const ProductSubDocSchema = SchemaFactory.createForClass(ProductSubDoc);