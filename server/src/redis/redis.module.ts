import {
  DynamicModule,
  Module,
  FactoryProvider,
  ModuleMetadata,
} from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';

/*
https://github.com/nestjs/jwt#async-options
make sure that we connect to Redis before making our Redis client available
use asynchronous
*/

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

type RedisAsyncModuleOptions = {
    getRedisConnection: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> | RedisModuleOptions;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

export const IORedisKey = 'IORedis';

/*
dynamic module
*/
@Module({})
export class RedisModule {
  // registers a new module asynchronously
  static async registerAsync({
    getRedisConnection, // this is passed in
    imports,
    inject,
  }: RedisAsyncModuleOptions): Promise<DynamicModule> {
    // the redis service
    const redisProvider = {
      provide: IORedisKey, // token, and the nane of the provider
      // this can be further refactored to use the correct syntax
      useFactory: async (...args) => { // this is the provider
        const { connectionOptions, onClientReady } = await getRedisConnection(...args);
        const client = await new IORedis(connectionOptions);

        onClientReady(client);

        return client;
      },
      inject,
    };
    console.log('i am called here');
    return {
      module: RedisModule,
      imports: imports,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
