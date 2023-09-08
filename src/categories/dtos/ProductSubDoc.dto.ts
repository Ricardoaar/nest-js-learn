import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductSubDocDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}


class UpdateSubDocDto extends PartialType(CreateProductSubDocDto) {
}