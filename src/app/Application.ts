import { ExpressConfig } from "../middleware/common/Express";
import * as config from 'config';
import { logger } from '../util/logger';


export class Application {

  server: any;
  express: ExpressConfig;

  constructor() { 
    this.express = new ExpressConfig();

    const port      = config.get('express.port');
    const debugPort = config.get('express.debug');
   
    this.server = this.express.app.listen(port, () => {
      logger.info(`
      -------------------------------------------------
      Server Started! Express: http://localhost:${port}
      Health: http://localhost:${port}/ping
      Debugger: http:/${this.server.address().address}:${port}/?ws=${this.server.address().address}:${port}&port=${debugPort}
      -------------------------------------------------
      `)
    })
  }

}