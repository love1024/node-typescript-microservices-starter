import { ExpressMiddlewareInterface } from "routing-controllers";
import { logger } from '../../util/logger';


export class TestMiddleware implements ExpressMiddlewareInterface {

  use(request: any, response: any, next?: (err?: any) => any): any {
    logger.info('Custom test middlare gets called');
    next();
  }
}