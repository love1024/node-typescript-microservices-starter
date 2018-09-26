import { UseBefore, Get, JsonController, Post, Body, Param } from "routing-controllers";
import { TestMiddleware } from '../../middleware/custom/Test';
import { ITestRequest } from "../request/ITestRequest";
import { ITestResponse } from "../response/ITestResponse";
import { logger } from '../../util/logger';


@JsonController()
@UseBefore(TestMiddleware)
export class TestController {
  products: any = [];
  idx = 0;

  @Get('/')
  async getAllProducts(): Promise<any> {
    return this.products;
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number): Promise<ITestResponse[]> {
    const obj = this.products.filter((product: ITestResponse) => product.id == id);
    return obj;
  }

  @Post('/')
  async insertProduct(@Body() request: ITestRequest): Promise<ITestResponse> {
    let obj = {
      id: this.idx++,
      name: request.name
    }
    this.products.push(obj);
    return obj;
  }
}