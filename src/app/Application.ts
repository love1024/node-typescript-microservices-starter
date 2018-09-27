import { ExpressConfig } from "../middleware/common/Express";
import * as config from 'config';
import { logger } from '../util/logger';
import { Mongo } from '../adapter/Mongo';


export class Application {

  server: any;
  express: ExpressConfig;

  constructor() { 
    this.express = new ExpressConfig();

    const port      = config.get('express.port');

    new Mongo();
   
    this.server = this.express.app.listen(port, () => {
      logger.info(`
      -------------------------------------------------
      Server Started! Express: http://localhost:${port}
      Health: http://localhost:${port}/ping
      -------------------------------------------------
      `)
    })
  }

}