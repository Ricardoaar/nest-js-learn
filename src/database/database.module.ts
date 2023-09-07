import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


const API_KEY = '1235';


@Global()
@Module({
  imports: [MongooseModule.forRootAsync({
    inject: [config.KEY],
    useFactory: (envConfig: ConfigType<typeof config>) => {
      const { mongo } = envConfig;
      const { url, db, user, pass } = mongo;
      return {
        uri: url,
        dbName: db,
        user,
        pass,
      };

    },
  })],
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
    MongooseModule,
  ],

})
export class DatabaseModule {
}
