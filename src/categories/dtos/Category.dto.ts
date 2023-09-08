import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateProductDto } from '../../products/dtos/product.dto';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image: string;


  @IsMongoId({
    each: true,
  })
  @ArrayUnique()
  readonly products: string[];

}

export class UpdateCategoryDto extends PartialType(CategoryDto) {
}