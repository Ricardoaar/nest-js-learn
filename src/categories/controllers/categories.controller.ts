import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CategoryDto, UpdateCategoryDto } from '../dtos/Category.dto';

@Controller('categories')
export class CategoriesController {

  constructor(private readonly categoriesService: CategoriesService) {
  }

  @Get()
  getCategories() {
    return this.categoriesService.findAll();
  }

  @Post()
  createCategory(@Body() payload: CategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Get('/:id')
  getCategory(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }

  @Put('/:id')
  updateCategory(@Param('id') id: number, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(id, payload);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.delete(id);
  }

}
