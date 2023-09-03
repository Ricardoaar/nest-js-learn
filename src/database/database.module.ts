import { Global, Module } from '@nestjs/common';

const API_KEY = '1235';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  exports: [
    'API_KEY',
  ],

})
export class DatabaseModule {
}
