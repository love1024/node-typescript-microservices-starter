import * as Mongoose from 'mongoose';
import * as config from 'config';
import { logger } from '../../util/logger';



export class MongooseAccess {
  static mongooseInstance: any;
  static mongooseConnection: Mongoose.Connection;

  constructor() {
    MongooseAccess.connect();
  }

  static connect(): Mongoose.Connection {
    if (this.mongooseInstance) {
      return this.mongooseInstance;
    }

    const connectionString = config.get('mongo.urlClient').toString();
    this.mongooseConnection = Mongoose.connection;

    this.mongooseConnection.once('open', () => {
      logger.info('Connection to mongodb is opened');
    });
    this.mongooseInstance = Mongoose.connect(connectionString);

    this.mongooseConnection.on('connected', () => {
      logger.info('Mongoose default connection open to ', connectionString);
    });

    this.mongooseConnection.on('error', (err) => {
      logger.error('Mongoose default conneciton error:', err);
    });

    this.mongooseConnection.on('disconnected', () => {
      setTimeout(() => {
        this.mongooseInstance = Mongoose.connect(connectionString);
      }, 1000)
      logger.info('Mongoose default connection disconnected');
    });

    this.mongooseConnection.on('reconnected', () => {
      logger.info('Mongoose default connection is reconnected');
    })

    process.on('SIGINT', () => {
      this.mongooseConnection.close(() => {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
      })
    })

  }
}