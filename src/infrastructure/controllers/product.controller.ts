import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
} from '@nestjs/common';
import GetAllProductsUseCase from 'src/application/getAllProducts.usecase';
import GetProductUseCase from 'src/application/getProduct.usecase';
import Product from 'src/domain/product';
import CreateProductUseCase from 'src/application/createProduct.usecase';
import DeleteProductUseCase from 'src/application/deleteProduct.usecase';
import UpdateProductUseCase from 'src/application/updateProduct.usecase';

@Controller('products/')
export default class ProductController {
  constructor(
    private getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Get()
  public async getProducts(@Res() request): Promise<any> {
    const products = await this.getAllProductsUseCase.handler();
    return request.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  public async getProduct(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    const product = await this.getProductUseCase.handler(id);
    return request.status(HttpStatus.OK).json(product);
  }

  @Post()
  public async createProduct(
    @Res() request,
    @Body() product: Product,
  ): Promise<any> {
    const productCreated = await this.createProductUseCase.handler(product);
    return request.status(HttpStatus.CREATED).json(productCreated);
  }

  @Delete(':id')
  public async deleteProduct(
    @Res() request,
    @Param('id') id: string,
  ): Promise<any> {
    const product = await this.deleteProductUseCase.handler(id);
    return request.status(HttpStatus.OK).json(product);
  }

  @Put(':id')
  public async updateProduct(
    @Res() request,
    @Param('id') id: string,
    @Body() product: Product,
  ): Promise<any> {
    const productUpdated = await this.updateProductUseCase.handler(id, product);
    return request.status(HttpStatus.OK).json(productUpdated);
  }
}
