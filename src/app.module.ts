import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AuthService } from './auth/services/auth.service';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        MONGO_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
    JwtModule.registerAsync(
      {
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => ({
          secret: configService.jwt.secret,
          signOptions: { expiresIn: '1d' },
        }),
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})

export class AppModule {
}
