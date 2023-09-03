import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of a product',
  })
  readonly name: string;

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
}

export class UpdateProductDto extends PartialType(CreateProductDto) {

}



