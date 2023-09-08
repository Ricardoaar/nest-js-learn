import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested, IsMongoId,
} from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { required } from 'joi';
import { CategoryDto } from '../../categories/dtos/Category.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of a product',
  })
  readonly description: string;


  @IsPositive()
  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  }, {
    message: ({ value, constraints }: ValidationArguments) => {
      const [integer, decimal] = `${value}`.split('.');
      const [maxDecimalPlacesConstraint] = constraints;
      return `The decimal places of ${value} must be less than or equal to ${maxDecimalPlacesConstraint.maxDecimalPlaces}`;

    },
  })
  readonly price: number;

  @IsPositive()
  @IsNumber()
  stock: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsMongoId()
  category: string;

}

export class UpdateProductDto extends PartialType(CreateProductDto) {

}


export class FilterProductDto {
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  offset: number;


  @Min(0)
  @IsOptional()
  minPrice: number;


  @ValidateIf((params) => {
    return !!params.minPrice;
  })
  @IsPositive()
  maxPrice: number;
}