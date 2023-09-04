import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../config';
import { ConfigType } from '@nestjs/config';

const API_KEY = '1235';


@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    }, {
      provide: 'DATABASE_CONNECTION',


      useFactory: async (envConfig: ConfigType<typeof config>) => {
        const { mongo } = envConfig;
        const { db, url } = mongo;
        const client = new MongoClient(url, {});
        const connection = await client.connect();
        return connection.db(db);
      },
      inject: [config.KEY],
    },
  ],
  exports: [
    'API_KEY',
    'DATABASE_CONNECTION',
  ],

})
export class DatabaseModule {
}
